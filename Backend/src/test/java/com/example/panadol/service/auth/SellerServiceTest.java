package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.seller.*;
import com.example.panadol.mapper.seller.BusinessInfoMapper;
import com.example.panadol.mapper.seller.IdentityInfoMapper;
import com.example.panadol.mapper.seller.PaymentMethodMapper;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.auth.seller.*;
import com.example.panadol.repository.auth.UserRepository;
import com.example.panadol.repository.auth.seller.*;
import com.example.panadol.security.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DataJpaTest
public class SellerServiceTest {
    @Autowired
    private UserRepository userRepository;
    @Mock
    private BusinessInfoRepository businessInfoRepository;
    @Mock
    private IdentityInfoRepository identityInfoRepository;
    @Mock
    private NationalIdRepository nationalIdRepository;
    @Mock
    private PaymentMethodRepository paymentMethodRepository;
    @Mock
    private SellerRepository sellerRepository;
    @Mock
    private AuthService authService;
    @Mock
    private BusinessInfoMapper businessInfoMapper;
    @Mock
    private PaymentMethodMapper paymentMethodMapper;
    @Mock
    private IdentityInfoMapper identityInfoMapper;
    private SellerService sellerService;

    @BeforeEach
    public void setup() {
        sellerService = new SellerService(
                userRepository, businessInfoRepository,
                identityInfoRepository, nationalIdRepository,
                paymentMethodRepository, sellerRepository, authService,
                businessInfoMapper, paymentMethodMapper, identityInfoMapper
        );
    }

    @Test
    @Transactional
    public void testRegisterNewSeller() {
        // Arrange
        final SellerRequest sellerRequest = createMockSellerRequest();
        final AppUser currentUser = createMockAppUser();
        when(authService.getCurrentUser()).thenReturn(currentUser);

        // Mock behavior of Mappers
        when(businessInfoMapper.map(any(BusinessInfoRequest.class))).thenReturn(createMockBusinessInfo());
        when(paymentMethodMapper.map(any(PaymentMethodRequest.class))).thenReturn(createMockPaymentMethod());
        when(identityInfoMapper.map(any(IdentityInfoRequest.class), any(NationalId.class))).thenReturn(createMockIdentityInfo());

        // Mock models
        when(nationalIdRepository.save(any(NationalId.class))).thenReturn(createMockNationalId());
        when(paymentMethodRepository.save(any(PaymentMethod.class))).thenReturn(createMockPaymentMethod());
        when(identityInfoRepository.save(any(IdentityInfo.class))).thenReturn(createMockIdentityInfo());
        when(businessInfoRepository.save(any(BusinessInfo.class))).thenReturn(createMockBusinessInfo());
        when(sellerRepository.save(any(Seller.class))).thenReturn(createMockSeller());

        // Act
        String result = sellerService.registerNewSeller(sellerRequest);

        // Assert
        assertEquals(Role.ROLE_SELLER.role, result);
        // Verify interaction
        verify(authService, times(1)).getCurrentUser();
    }

    // Helper methods to create mock objects for testing
    private SellerRequest createMockSellerRequest() {
        final SellerRequest sellerRequest = new SellerRequest();
        sellerRequest.setBusinessInfo(new BusinessInfoRequest(
                "Egypt",
                "Alexandria",
                "Alexandria",
                "Ibrahmeya",
                "lageteh",
                "2",
                "Hello World Store"
        ));
        sellerRequest.setIdentityInfo(new IdentityInfoRequest(
                new NationalIdRequest("123456789", "15/8/2030"),
                "Sara",
                "Ali",
                "Ragab",
                "18/1/2000"
        ));
        sellerRequest.setPaymentMethods(List.of(new PaymentMethodRequest(
                "123456789",
                "8",
                "2028",
                "Sara Ragab"
        )));
        return sellerRequest;
    }

    private AppUser createMockAppUser() {
        final AppUser user = new AppUser();
        user.setEmail("test@example.com");
        user.setUserName("User Name");
        user.setPassword("password");
        user.setPhoneNumber("+201234567");
        user.setEnabled(true);
        user.setRole(Role.ROLE_CUSTOMER);
        return user;
    }

    private BusinessInfo createMockBusinessInfo() {
        final BusinessInfo businessInfo = new BusinessInfo();
        businessInfo.setApartment("2");
        businessInfo.setCity("Alexandria");
        businessInfo.setArea("Ibrahmeya");
        businessInfo.setStreet("lageteh");
        businessInfo.setCountry("Egypt");
        businessInfo.setUniqueBusinessName("Hello World Store");
        businessInfo.setGovernorate("Alexandria");
        return businessInfo;
    }

    private PaymentMethod createMockPaymentMethod() {
        return new PaymentMethod(
                "123456789",
                "8",
                "2028",
                "Sara Ragab"
        );
    }

    private NationalId createMockNationalId() {
        return new NationalId("123456789", "15/8/2030");
    }

    private IdentityInfo createMockIdentityInfo() {
        return new IdentityInfo(
                1L,
                new NationalId("123456789", "15/8/2030"),
                "Sara",
                "Ali",
                "Ragab",
                "18/1/2000"
        );
    }

    private Seller createMockSeller() {
        return new Seller(
                new SellerPK(createMockAppUser()),
                List.of(createMockPaymentMethod()),
                createMockBusinessInfo(),
                createMockIdentityInfo()
        );
    }
}
