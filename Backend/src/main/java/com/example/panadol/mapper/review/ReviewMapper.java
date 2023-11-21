package com.example.panadol.mapper.review;

import com.example.panadol.dto.review.ReviewRequest;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.product.Product;
import com.example.panadol.model.review.Review;
import com.example.panadol.service.auth.AuthService;
import com.example.panadol.service.product.ProductService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring") // Works as Bean
@Component
public abstract class ReviewMapper {
    @Autowired
    private ProductService productService;
    private AuthService authService;

    @Mapping(target = "rate", source = "rate")
    @Mapping(target = "comment", source = "comment")
    @Mapping(target = "createdDate", expression = "java(new java.util.Date())")
    @Mapping(target = "product", source = "productId", qualifiedByName = "getProduct")
    @Mapping(target = "owner", expression = "java(getCurrentUser())")
    public abstract Review map(ReviewRequest reviewRequest);

    @Named("getProduct")
    Product getProduct(Long productId) {
        return productService.getProductById(productId);
    }

    AppUser getCurrentUser() {
        return authService.getCurrentUser();
    }
}
