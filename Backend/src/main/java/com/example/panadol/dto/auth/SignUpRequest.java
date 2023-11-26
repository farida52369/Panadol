package com.example.panadol.dto.auth;

import com.example.panadol.validation.ValidEmail;
import com.example.panadol.validation.ValidPassword;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
public class SignUpRequest {
    @NotBlank
    @Size(min = 1, max = 100)
    private String userName;
    @ValidPassword
    private String password;
    @ValidEmail
    @NotBlank
    @Size(min = 1, max = 254)
    private String email;
    @NotBlank
    private String phoneNumber;
}
