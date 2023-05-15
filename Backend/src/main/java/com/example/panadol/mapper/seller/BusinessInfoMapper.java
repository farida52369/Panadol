package com.example.panadol.mapper.seller;

import com.example.panadol.dto.auth.seller.BusinessInfoRequest;
import com.example.panadol.model.auth.seller.BusinessInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring") // Works as Bean
@Component
public interface BusinessInfoMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "country", source = "country")
    @Mapping(target = "governorate", source = "governorate")
    @Mapping(target = "city", source = "city")
    @Mapping(target = "area", source = "area")
    @Mapping(target = "street", source = "street")
    @Mapping(target = "apartment", source = "apartment")
    @Mapping(target = "uniqueBusinessName", source = "uniqueBusinessName")
    BusinessInfo map(BusinessInfoRequest businessInfoRequest);
}
