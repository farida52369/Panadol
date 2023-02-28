package com.example.panadol.service.product;

import com.example.panadol.dto.*;
import com.example.panadol.model.product.Product;
import com.example.panadol.repository.product.ProductRepository;
import com.example.panadol.repository.auth.UserRepository;
import com.example.panadol.service.auth.SignInService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final SignInService authService;
    private final UserRepository userRepository;

    public List<ProductSpecificDetails> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductSpecificDetails> res = new ArrayList<>();
        for (Product product : products) {
//            if (product.getInStock() <= 0) continue;
//            res.add(ProductSpecificDetails.builder().
//                    productId(product.getProductId()).
//                    title(product.getTitle()).
//                    description(product.getDescription()).
//                    price(product.getPrice()).
//                    image(product.getImage()).
//                    inStock(product.getInStock()).
//                    build());
        }
        return res;
    }

    public ProductResponse getSpecificProduct(Long id) {
        Product product = productRepository.getById(id);
        return ProductResponse.builder().
                productId(product.getProductId()).
//                title(product.getTitle()).
//                description(product.getDescription()).
//                price(product.getPrice()).
//                inStock(product.getInStock()).
//                category(product.getCategory()).
//                image(product.getImage()).
//                createdDate(product.getCreatedDate()).
                build();
    }

    public ProductAllInfo productAllInfo(Long productId, String email) {
        Product product = productRepository.getById(productId);
        return ProductAllInfo.builder().
                productId(productId).
//                price(product.getPrice()).
//                isOwner(product.getManager().getEmail().equalsIgnoreCase(email)).
//                owner(email).
//                image(product.getImage()).
//                createdDate(product.getCreatedDate()).
//                inStock(product.getInStock()).
//                title(product.getTitle()).
//                description(product.getDescription()).
//                category(product.getCategory()).
                build();
    }

    public void editProduct(ProductEdit productEdit) {
        Product product = productRepository.getById(productEdit.getProductId());
//        product.setInStock(productEdit.getInStock());
//        product.setCategory(productEdit.getCategory());
//        product.setPrice(productEdit.getPrice());
//        product.setTitle(productEdit.getTitle());
//        product.setDescription(productEdit.getDescription());
        productRepository.save(product);
    }
}
