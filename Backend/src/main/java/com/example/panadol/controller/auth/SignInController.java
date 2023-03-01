package com.example.panadol.controller.auth;

import com.example.panadol.dto.auth.AuthenticationResponse;
import com.example.panadol.dto.auth.LoginRequest;
import com.example.panadol.dto.auth.PasswordResetRequest;
import com.example.panadol.dto.auth.RefreshTokenRequest;
import com.example.panadol.service.auth.SignInService;
import com.example.panadol.service.auth.VerTokenService;
import com.example.panadol.service.auth.VerificationType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class SignInController {

    private final SignInService signInService;

    @GetMapping(
            value = "/checkEmail"
    )
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean isValidEmail = signInService.isEmailExist(email);
        log.info("Checking the Email given by the user: {} value: {}", email, isValidEmail);
        return ResponseEntity.ok(isValidEmail);
    }

    @PostMapping(
            value = "/login",
            consumes = {"application/json"}
    )
    public ResponseEntity<AuthenticationResponse> login(
            @Valid @RequestBody LoginRequest loginRequest
    ) {
        log.info("Login User {}", loginRequest.getEmail());
        return ResponseEntity.ok(signInService.loginToPanadol(loginRequest));
    }
}
