package com.example.panadol.controller.auth;

import com.example.panadol.dto.auth.SignUpRequest;
import com.example.panadol.dto.auth.seller.SellerRequest;
import com.example.panadol.service.auth.SellerService;
import com.example.panadol.service.auth.SignUpService;
import com.example.panadol.service.auth.VerTokenService;
import com.example.panadol.service.auth.VerificationType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.http.HttpStatus.CREATED;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class SignUpController {
    private final SignUpService signUpService;
    private final SellerService sellerService;
    private final VerTokenService verificationTokenService;

    @PostMapping(
            value = "/register",
            consumes = {"application/json"}
    )
    public ResponseEntity<String> registerNewUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        log.info("{}", signUpRequest);
        signUpService.registerNewUser(signUpRequest);
        return new ResponseEntity<>("Mail Sent Successfully", CREATED);
    }

    @GetMapping(
            value = "/accountVerification"
    )
    public ResponseEntity<String> verifyAccount(@RequestParam String token) {
        return ResponseEntity.ok(signUpService.verifyAccount(token));
    }

    @GetMapping(
            value = "/resend-verification"
    )
    public ResponseEntity<String> resendRegistrationToken(@RequestParam String email) {
        verificationTokenService.resendVerificationToken(email, VerificationType.REGISTER);
        return ResponseEntity.ok("Confirmation Mail is send Successfully.");
    }

    @PostMapping(
            value = "/register/as/seller",
            consumes = {"application/json"}
    )
    public ResponseEntity<String> registerNewSeller(@Valid @RequestBody SellerRequest sellerRequest) {
        return new ResponseEntity<>(sellerService.registerNewSeller(sellerRequest), CREATED);
    }
}
