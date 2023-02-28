package com.example.panadol.mapper.product;

import com.example.panadol.dto.product.BasicInfoRequest;
import com.example.panadol.model.product.ProductBasicInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring") // Works as Bean
public interface ProductBasicInfoMapper {
    @Mapping(target = "basicInfoId", ignore = true)
    @Mapping(target = "title", source = "title")
    @Mapping(target = "price", source = "price")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "inStock", source = "inStock")
    ProductBasicInfo map(BasicInfoRequest basicInfoRequest);
}
