package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.AuthenticationResponse;
import com.example.panadol.dto.auth.LoginRequest;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.repository.auth.UserRepository;
import com.example.panadol.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SignInService {
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final AuthService authService;

    public boolean isEmailExist(String email) {
        final AppUser user = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new UsernameNotFoundException("User doesn't exist: " + email);
        });
        return user.getEnabled();
    }

    public AuthenticationResponse loginToPanadol(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("{} Logged in", loginRequest.getEmail());
        String token = jwtProvider.generateToken(authentication);
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenService.generateRefreshToken().getToken())
                .expiresAt(new Date(System.currentTimeMillis() + jwtProvider.getJwtExpirationInMillis()))
                .email(loginRequest.getEmail())
                .role(authService.getCurrentUserRole())
                .build();
    }
}
