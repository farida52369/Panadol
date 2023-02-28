package com.example.panadol.controller.auth;

import com.example.panadol.dto.auth.PasswordResetRequest;
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
public class ForgetPasswordController {
    private final VerTokenService verificationTokenService;

    @GetMapping(
            value = "/forget-password"
    )
    public ResponseEntity<String> forgetPassword(@RequestParam String email) {
        verificationTokenService.forgetPassword(email);
        return ResponseEntity.ok("Send Password Token To The User");
    }

    @GetMapping(
            value = "/verify-reset-token"
    )
    public ResponseEntity<Boolean> verifyResetToken(@RequestParam String token) {
        return ResponseEntity.ok(verificationTokenService.validatePasswordResetToken(token, VerificationType.FORGET_PASSWORD));
    }

    @GetMapping(
            value = "/resend-token"
    )
    public ResponseEntity<String> resendPasswordToken(@RequestParam String email) {
        verificationTokenService.resendVerificationToken(email, VerificationType.FORGET_PASSWORD);
        return ResponseEntity.ok("Password Token Resent Successfully!");
    }

    @PostMapping(
            value = "/reset-password",
            consumes = {"application/json"}
    )
    public ResponseEntity<String> resetPassword(
            @Valid @RequestBody PasswordResetRequest passwordResetRequest
    ) {
        // log.info("New Password: {}", passwordResetRequest.getNewPassword());
        verificationTokenService.resetPassword(passwordResetRequest);
        return ResponseEntity.ok("Password reset successfully");
    }
}
