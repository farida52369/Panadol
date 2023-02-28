package com.example.panadol.model.auth.seller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "seller")
public class Seller {
    @EmbeddedId
    private SellerPK user;
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "paymentMethods",
            joinColumns = @JoinColumn(name = "sellerId"),
            inverseJoinColumns = @JoinColumn(name = "paymentMethodId"))
    private List<PaymentMethod> paymentMethods;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "businessInfo", referencedColumnName = "businessInfoId")
    private BusinessInfo businessInfo;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "identityInfo", referencedColumnName = "identityInfoId")
    private IdentityInfo identityInfo;
}
