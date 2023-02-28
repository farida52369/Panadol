package com.example.panadol.dto.auth;

import com.example.panadol.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PasswordResetRequest {
    private  String email;
    @ValidPassword
    private String newPassword;
}
