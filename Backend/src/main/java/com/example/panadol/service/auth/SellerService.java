package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.seller.BusinessInfoRequest;
import com.example.panadol.dto.auth.seller.IdentityInfoRequest;
import com.example.panadol.dto.auth.seller.PaymentMethodRequest;
import com.example.panadol.dto.auth.seller.SellerRequest;
import com.example.panadol.mapper.seller.BusinessInfoMapper;
import com.example.panadol.mapper.seller.IdentityInfoMapper;
import com.example.panadol.mapper.seller.PaymentMethodMapper;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.auth.seller.*;
import com.example.panadol.repository.auth.UserRepository;
import com.example.panadol.repository.auth.seller.*;
import com.example.panadol.security.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SellerService {
    // Transaction
    private final UserRepository userRepository;
    private final BusinessInfoRepository businessInfoRepository;
    private final IdentityInfoRepository identityInfoRepository;
    private final NationalIdRepository nationalIdRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final SellerRepository sellerRepository;
    // Get Current User
    private final SignInService authService;
    // Mappers
    private final BusinessInfoMapper businessInfoMapper;
    private final PaymentMethodMapper paymentMethodMapper;
    private final IdentityInfoMapper identityInfoMapper;

    public String registerNewSeller(final SellerRequest sellerRequest) {
        final AppUser user = authService.getCurrentUser();
        log.info("The User wanna become seller: {}", user.getEmail());

        // Set Seller to be True
        user.setRole(Role.ROLE_SELLER);
        userRepository.save(user);

        // Set Seller Info
        final Seller seller = new Seller();
        seller.setUser(new SellerPK(user));
        seller.setBusinessInfo(getBusinessInfo(sellerRequest.getBusinessInfo()));
        seller.setPaymentMethods(getPaymentMethod(sellerRequest.getPaymentMethods()));
        seller.setIdentityInfo(getIdentityInfo(sellerRequest.getIdentityInfo()));
        sellerRepository.save(seller);
        return Role.ROLE_SELLER.role;
    }

    private BusinessInfo getBusinessInfo(BusinessInfoRequest businessInfoRequest) {
        final BusinessInfo businessInfo = businessInfoMapper.map(businessInfoRequest);
        businessInfoRepository.save(businessInfo);
        return businessInfo;
    }

    private List<PaymentMethod> getPaymentMethod(final List<PaymentMethodRequest> paymentMethodRequests) {
        return paymentMethodRequests.stream().map(paymentMethodRequest -> {
            PaymentMethod paymentMethod = paymentMethodMapper.map(paymentMethodRequest);
            paymentMethodRepository.save(paymentMethod);
            return paymentMethod;
        }).collect(Collectors.toList());
    }

    private IdentityInfo getIdentityInfo(final IdentityInfoRequest identityInfoRequest) {
        // National ID
        final NationalId nationalId = new NationalId();
        nationalId.setNationalId(identityInfoRequest.getIdNational().getNationalID());
        nationalId.setExpiryDate(identityInfoRequest.getIdNational().getExpiryDate());
        nationalIdRepository.save(nationalId);

        // The Rest
        final IdentityInfo identityInfo = identityInfoMapper.map(identityInfoRequest, nationalId);
        identityInfoRepository.save(identityInfo);
        return identityInfo;
    }
}
