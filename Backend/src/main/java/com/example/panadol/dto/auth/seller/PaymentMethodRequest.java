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
public class PaymentMethodRequest {
    @NotBlank
    private String cardNumber;
    @NotBlank
    @Size(min = 1, max = 2)
    private String expiryMonth;
    @NotBlank
    @Size(min = 4, max = 5)
    private String expiryYear;
    @NotBlank
    private String cardHolderName;
}
