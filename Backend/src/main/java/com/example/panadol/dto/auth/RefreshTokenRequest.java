package com.example.panadol.dto.auth;

import com.example.panadol.validation.ValidEmail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RefreshTokenRequest {
    @NotBlank
    private String refreshToken;
    @ValidEmail
    @NotBlank
    private String email;
}
