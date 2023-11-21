package com.example.panadol.mapper.product;

import com.example.panadol.dto.product.BasicInfoRequest;
import com.example.panadol.model.product.ProductBasicInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring") // Works as Bean
@Component
public interface ProductBasicInfoToRequestMapper {
    @Mapping(target = "title", source = "title")
    @Mapping(target = "price", source = "price")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "inStock", source = "inStock")
    @Mapping(target = "rate", source = "rate")
    BasicInfoRequest map(ProductBasicInfo productBasicInfo);
}
