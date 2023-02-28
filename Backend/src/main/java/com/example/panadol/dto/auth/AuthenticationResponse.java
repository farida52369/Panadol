package com.example.panadol.dto.auth;

import lombok.*;

import java.util.Date;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AuthenticationResponse {
    private String authenticationToken; // from Jwt Provider
    private String refreshToken; // from RefreshTokenService
    private Date expiresAt;
    private String email;
    private String role;
}
