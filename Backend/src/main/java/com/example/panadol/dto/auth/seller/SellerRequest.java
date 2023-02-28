package com.example.panadol.dto.auth.seller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SellerRequest {
    private BusinessInfoRequest businessInfo;
    private IdentityInfoRequest identityInfo;
    private List<PaymentMethodRequest> paymentMethods;
}
