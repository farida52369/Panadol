package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.NotificationEmail;
import com.example.panadol.dto.auth.PasswordResetRequest;
import com.example.panadol.exception.PanadolException;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.auth.VerificationToken;
import com.example.panadol.repository.auth.UserRepository;
import com.example.panadol.repository.auth.VerificationTokenRepository;
import com.example.panadol.response.GenericResponse;
import com.example.panadol.service.JavaMailService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

import static com.example.panadol.response.GenericResponse.*;
import static com.example.panadol.service.auth.VerificationType.FORGET_PASSWORD;
import static com.example.panadol.service.auth.VerificationType.REGISTER;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class VerTokenService {
    private final JavaMailService mailService;
    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public VerificationToken getByToken(final String token) {
        return verificationTokenRepository.findByToken(token).orElseThrow(() -> {
            throw new PanadolException("Not Found Verification Token");
        });
    }

    public void deleteToken(VerificationToken verificationToken) {
        verificationTokenRepository.delete(verificationToken);
    }

    public void forgetPassword(final String email) {
        final AppUser user = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new UsernameNotFoundException("User doesn't exist: " + email);
        });
       generateVerificationToken(user, FORGET_PASSWORD);
    }

    public Boolean validatePasswordResetToken(final String token, final VerificationType type) {
        return validateVerificationToken(token, type) == TOKEN_VALID;
    }

    public void resetPassword(PasswordResetRequest passwordResetRequest) {
        final String email = passwordResetRequest.getEmail();
        final AppUser user = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new PanadolException("User Not In System.");
        });

        user.setPassword(passwordEncoder.encode(passwordResetRequest.getNewPassword()));
        userRepository.save(user);
    }

    public GenericResponse validateVerificationToken(final String aboutType, final VerificationType type) {
        final Optional<VerificationToken> verificationToken;
        if (type == FORGET_PASSWORD) {
            verificationToken = verificationTokenRepository.findByToken(aboutType);
        } else {
            final AppUser user = userRepository.findByEmail(aboutType).orElseThrow(
                    () -> {
                        throw new PanadolException("User Not In System.");
                    }
            );
            verificationToken = verificationTokenRepository.findByUser(user);
        }

        if (!verificationToken.isPresent()) {
            return TOKEN_INVALID;
        }

        final Calendar cal = Calendar.getInstance();
        if ((verificationToken.get().getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            return TOKEN_EXPIRED;
        }

        return TOKEN_VALID;
    }

    public void resendVerificationToken(String aboutType, VerificationType type) {
        final Optional<VerificationToken> verificationToken;
        final AppUser user = userRepository.findByEmail(aboutType).orElseThrow(
                () -> {
                    throw new PanadolException("User Not In System.");
                }
        );
        verificationToken = verificationTokenRepository.findByUser(user);

        if (!verificationToken.isPresent()) {
            throw new PanadolException("Invalid Verification Token!");
        }

        final VerificationToken token = verificationToken.get();
        String newToken = UUID.randomUUID().toString();
        if (type == FORGET_PASSWORD) newToken = newToken.substring(0, 6);
        token.updateToken(newToken);
        verificationTokenRepository.save(token);

        sendMailForVerification(token.getUser().getEmail(), token.getToken(), type);
        // return newToken;
    }

    public void sendMailConfirmRegisteration(final AppUser user) {
        generateVerificationToken(user, REGISTER);
    }

    private void sendMailForVerification(final String email, final String token, final VerificationType type) {
        NotificationEmail notificationEmail = (type == FORGET_PASSWORD ?
                new NotificationEmail(email,
                        "Reset password for Panadol account",
                        "You have requested to reset your password\r\n" +
                                "To authenticate, please use the following One Time Password (OTP):\r\n"
                                + token + "\r\n\nDo not share this OTP with anyone. Our customer service " +
                                "team will never ask you for your password, OTP, credit card or banking info." +
                                "\r\nIn case you remember your password, ignore this email.")
                :
                new NotificationEmail(email,
                        "Verify your new Panadol account",
                        "To verify your email address and activate your Panadol account." +
                                "\r\nplease follow this link:\r\n" +
                                "http://localhost:8080/api/auth/accountVerification?token=" + token));
        mailService.sendJavaMail(notificationEmail);
    }

    private void generateVerificationToken(final AppUser user, final VerificationType type) {
        final Optional<VerificationToken> verificationTokenTest = verificationTokenRepository.findByUser(user);
        if (verificationTokenTest.isPresent()) {
            // log.info("Already Exist in Verification Token!");
            if (type == VerificationType.REGISTER)
                resendVerificationToken(user.getEmail(), REGISTER);
            else resendVerificationToken(user.getEmail(), FORGET_PASSWORD);
            return;
        }

        String token = UUID.randomUUID().toString();
        if (type == FORGET_PASSWORD) token = token.substring(0, 6);
        final VerificationToken verificationToken = new VerificationToken(token, user);
        verificationTokenRepository.save(verificationToken);

        sendMailForVerification(user.getEmail(), token, FORGET_PASSWORD);
    }
}
