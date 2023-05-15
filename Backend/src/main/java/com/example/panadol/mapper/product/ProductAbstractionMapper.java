package com.example.panadol.mapper.product;

import com.example.panadol.dto.product.SomeProductInfoResponse;
import com.example.panadol.model.product.Product;
import com.example.panadol.model.product.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Mapper(componentModel = "spring") // Works as Bean
@Component
public interface ProductAbstractionMapper {

    @Mapping(target = "productId", source = "productId", qualifiedByName = "longToString")
    @Mapping(target = "rate", source = "basicInfo.rate", qualifiedByName = "doubleToString")
    @Mapping(target = "image", source = "imageList", qualifiedByName = "getImage")
    @Mapping(target = "title", source = "basicInfo.title")
    @Mapping(target = "price", source = "basicInfo.price")
    @Mapping(target = "inStock", source = "basicInfo.inStock")
    SomeProductInfoResponse map(Product product);

    @Named("longToString")
    default String longToString(Long value) {
        return value.toString();
    }

    @Named("doubleToString")
    default String doubleToString(Double value) {
        return value.toString();
    }

    @Named("getImage")
    default byte[] getImage(List<ProductImage> imageList) {
        if (imageList.size() == 0) return null;
        return imageList.get(0).getImage();
    }
}
