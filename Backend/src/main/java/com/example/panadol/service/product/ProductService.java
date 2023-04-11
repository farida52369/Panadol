package com.example.panadol.service.product;

import com.example.panadol.dto.ProductAllInfo;
import com.example.panadol.dto.ProductEdit;
import com.example.panadol.dto.ProductResponse;
import com.example.panadol.dto.product.ProductAbstractionRequest;
import com.example.panadol.mapper.product.ProductAbstractionMapper;
import com.example.panadol.model.product.Product;
import com.example.panadol.repository.product.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final ProductAbstractionMapper abstractionMapper;

    public List<ProductAbstractionRequest> getAllProducts(final int offset, final int limit) {
        log.info("Offset: {}, Limit: {}", offset, limit);
        List<ProductAbstractionRequest> res = new ArrayList<>();
        Pageable pageable = PageRequest.of(offset, limit);
        Page<Product> productPage = productRepository.findAll(pageable);
        productPage.forEach(product -> {
            res.add(abstractionMapper.map(product));
            log.info("Product #{}", product.getProductId());
        });
        // log.info("Products To Be Sent: {}", res.size());
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
