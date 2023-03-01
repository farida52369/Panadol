package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.ChangePassword;
import com.example.panadol.dto.auth.ProfileResponse;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.repository.auth.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserProfileService {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public ProfileResponse getUserInfo() {
        AppUser user = authService.getCurrentUser();
        log.info("{}", user);
        return ProfileResponse.builder().
                userName(user.getUserName()).
                email(user.getEmail()).
                phoneNumber(user.getPhoneNumber()).
                build();
    }

    public Boolean changeUsername(String newUsername) {
        try {
            AppUser user = authService.getCurrentUser();
            user.setUserName(newUsername);
            userRepository.save(user);
            return true;
        } catch (UsernameNotFoundException e) {
            return false;
        }
    }

    public Boolean changePhoneNumber(String newPhoneNumber) {
        try {
            AppUser user = authService.getCurrentUser();
            user.setPhoneNumber(newPhoneNumber);
            userRepository.save(user);
            return true;
        } catch (UsernameNotFoundException e) {
            return false;
        }
    }

    public Boolean changePassword(final ChangePassword response) {
        try {
            final AppUser user = authService.getCurrentUser();
            if (passwordEncoder.matches(response.getCurrentPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(response.getNewPassword()));
                userRepository.save(user);
                return true;
            }
            return false;
        } catch (UsernameNotFoundException e) {
            return false;
        }
    }
}
