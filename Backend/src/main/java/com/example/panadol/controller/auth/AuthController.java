package com.example.panadol.controller.auth;

import com.example.panadol.dto.auth.AuthenticationResponse;
import com.example.panadol.dto.auth.RefreshTokenRequest;
import com.example.panadol.service.auth.AuthService;
import com.example.panadol.service.auth.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final RefreshTokenService refreshTokenService;
    private final AuthService authService;

    @PostMapping(
            value = "/refresh/token",
            consumes = {"application/json"}
    )
    public ResponseEntity<AuthenticationResponse> refreshTokens(
            @Valid @RequestBody RefreshTokenRequest refreshTokenRequest
    ) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }

    @PostMapping(
            value = "/logout",
            consumes = {"application/json"}
    )
    public ResponseEntity<String> logout(
            @Valid @RequestBody RefreshTokenRequest refreshTokenRequest
    ) {
        log.info("Logging the user out of Panadol system ...");
        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());
        return ResponseEntity.ok("Refresh Token deleted successfully");
    }
}
