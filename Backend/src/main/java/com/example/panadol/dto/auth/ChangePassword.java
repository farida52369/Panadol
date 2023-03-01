package com.example.panadol.dto.auth;

import com.example.panadol.validation.ValidPassword;
import lombok.Getter;

@Getter
public class ChangePassword {
    @ValidPassword
    private String currentPassword;
    @ValidPassword
    private String newPassword;
}
