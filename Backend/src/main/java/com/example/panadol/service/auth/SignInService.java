package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.AuthenticationResponse;
import com.example.panadol.dto.auth.LoginRequest;
import com.example.panadol.dto.auth.RefreshTokenRequest;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.repository.auth.UserRepository;
import com.example.panadol.security.JwtProvider;
import com.example.panadol.security.JwtUser;
import com.example.panadol.service.RefreshTokenService;
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
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SignInService {
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;

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
                .role(getCurrentUserRole())
                .build();
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", getCurrentUser());
        final String token = jwtProvider.generateToken(refreshTokenRequest.getEmail(), claims);
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenRequest.getRefreshToken())
                .expiresAt(new Date(System.currentTimeMillis() + jwtProvider.getJwtExpirationInMillis()))
                .email(refreshTokenRequest.getEmail())
                .role(getCurrentUserRole())
                .build();
    }

    private String getCurrentUserRole() {
        final AppUser user = this.getCurrentUser();
        return user.getRole().role;
    }

    @Transactional(readOnly = true)
    public AppUser getCurrentUser() {
        JwtUser principal = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(principal.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("User Email not Found - " + principal.getUsername())
        );
    }
}
