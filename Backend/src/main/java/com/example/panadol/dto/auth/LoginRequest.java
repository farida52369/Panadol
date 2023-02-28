package com.example.panadol.dto.auth;

import com.example.panadol.validation.ValidEmail;
import com.example.panadol.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginRequest {
    @ValidEmail
    @NotBlank
    private String email;
    @ValidPassword
    private String password;
}
