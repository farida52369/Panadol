package com.example.panadol.mapper.seller;

import com.example.panadol.dto.auth.seller.PaymentMethodRequest;
import com.example.panadol.model.auth.seller.PaymentMethod;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface PaymentMethodMapper {
    @Mapping(target = "cardNumber", source = "cardNumber")
    @Mapping(target = "expiryMonth", source = "expiryMonth")
    @Mapping(target = "expiryYear", source = "expiryYear")
    @Mapping(target = "cardHolderName", source = "cardHolderName")
    PaymentMethod map(PaymentMethodRequest paymentMethodRequest);
}
