package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.SignUpRequest;
import com.example.panadol.exception.PanadolException;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.auth.VerificationToken;
import com.example.panadol.repository.auth.UserRepository;
import com.example.panadol.response.GenericResponse;
import com.example.panadol.security.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.example.panadol.response.GenericResponse.TOKEN_EXPIRED;
import static com.example.panadol.response.GenericResponse.TOKEN_VALID;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class SignUpService {

    private final VerTokenService verificationTokenService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public void registerNewUser(final SignUpRequest signUpRequest) {
        if (emailExists(signUpRequest.getEmail())) {
            throw new PanadolException("User " + signUpRequest.getEmail() + " Already Exists!");
        }

        final AppUser user = new AppUser();
        user.setUserName(signUpRequest.getUserName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setEnabled(false);
        user.setRole(Role.ROLE_CUSTOMER);
        userRepository.save(user);

        log.info("{} has registered", signUpRequest.getEmail());
        verificationTokenService.sendMailConfirmRegisteration(user);
    }

    private boolean emailExists(String email) {
        final Optional<AppUser> user = userRepository.findByEmail(email);
        if (!user.isPresent()) return false;
        return user.get().getEnabled();
    }

    public String verifyAccount(final String token) {
        GenericResponse response = verificationTokenService.validateVerificationToken(token);
        if (response == TOKEN_VALID) {
            fetchAndEnable(verificationTokenService.getByToken(token));
            return "Account activated Successfully!";
        }

        if (response == TOKEN_EXPIRED)
            return "Token expired (normally expires after One hours)\nTry registration again ...";
        return "Invalid Token that you provided :)";
    }

    private void fetchAndEnable(VerificationToken verificationToken) {
        final AppUser user = verificationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);

        verificationTokenService.deleteToken(verificationToken);
    }
}
