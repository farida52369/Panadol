package com.example.panadol.dto.auth.seller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NationalIdRequest {
    @NotBlank
    @Size(max = 20)
    private String nationalID;
    @NotBlank
    private String expiryDate;
}
