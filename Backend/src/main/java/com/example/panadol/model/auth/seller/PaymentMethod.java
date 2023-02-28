package com.example.panadol.model.auth.seller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "paymentMethod")
public class PaymentMethod {
    @Id
    @Column(name = "paymentMethodId", length = 20)
    private String cardNumber;
    @Column(nullable = false, name = "expiryMonth", length = 2)
    private String expiryMonth;
    @Column(nullable = false, name = "expiryYear", length = 5)
    private String expiryYear;
    @Column(nullable = false, name = "cardHolderName", length = 100)
    private String cardHolderName;
}
