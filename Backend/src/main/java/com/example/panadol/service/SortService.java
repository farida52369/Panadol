package com.example.panadol.service;

import com.example.panadol.dto.ProductSpecificDetails;
import com.example.panadol.model.product.Product;
import com.example.panadol.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SortService {

    private final ProductRepository productRepository;

    public List<ProductSpecificDetails> getProductsSortedByPrice() {
        List<ProductSpecificDetails> res = new ArrayList<>();
        List<Product> products = productRepository.findAll();
        /*
        products.sort((p1, p2) -> (int) (p1.getPrice() - p2.getPrice()));

        for (Product product : products) {
            if (product.getInStock() <= 0) continue;
            log.info("HOHO: Marry Christmas ... Product #{} is Matching for Sorting By Price ...", product.getProductId());
            ProductSpecificDetails productSpecificDetails = ProductSpecificDetails.builder().
                    productId(product.getProductId()).
                    title(product.getTitle()).
                    description(product.getDescription()).
                    price(product.getPrice()).
                    image(product.getImage()).
                    inStock(product.getInStock()).
                    build();
            res.add(productSpecificDetails);
        }*/
        return res;
    }

    public List<ProductSpecificDetails> getProductsSortedByQuantityInStock() {
        List<ProductSpecificDetails> res = new ArrayList<>();
        List<Product> products = productRepository.findAll();
        /*
        products.sort(Comparator.comparingInt(Product::getInStock));

        for (Product product : products) {
            if (product.getInStock() <= 0) continue;
            log.info("HOHO: Marry Christmas ... Product #{} is Matching for Sorting By Price ...", product.getProductId());
            ProductSpecificDetails productSpecificDetails = ProductSpecificDetails.builder().
                    productId(product.getProductId()).
                    title(product.getTitle()).
                    description(product.getDescription()).
                    price(product.getPrice()).
                    image(product.getImage()).
                    inStock(product.getInStock()).
                    build();
            res.add(productSpecificDetails);
        }*/
        return res;
    }
}
