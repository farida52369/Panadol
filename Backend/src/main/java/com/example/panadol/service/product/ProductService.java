package com.example.panadol.service.product;

import com.example.panadol.dto.product.DescriptionRequest;
import com.example.panadol.dto.product.EditableProductInfoResponse;
import com.example.panadol.dto.product.SomeProductInfoResponse;
import com.example.panadol.mapper.product.ProductAbstractionMapper;
import com.example.panadol.mapper.product.ProductBasicInfoToRequestMapper;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.product.Product;
import com.example.panadol.repository.product.ProductRepository;
import com.example.panadol.service.auth.AuthService;
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
    private final AuthService authService;
    private final ProductBasicInfoToRequestMapper productBasicInfoToRequestMapper;
    private final ProductAbstractionMapper abstractionMapper;

    public List<SomeProductInfoResponse> getAllProducts(final int offset, final int limit) {
        log.info("Offset: {}, Limit: {}", offset, limit);
        List<SomeProductInfoResponse> res = new ArrayList<>();
        Pageable pageable = PageRequest.of(offset, limit);
        Page<Product> productPage = productRepository.findAll(pageable);
        productPage.forEach(product -> {
            res.add(abstractionMapper.map(product));
            log.info("Product #{}", product.getProductId());
        });
        // log.info("Products To Be Sent: {}", res.size());
        return res;
    }

    public List<SomeProductInfoResponse> getCurrentUserProducts() {
        List<SomeProductInfoResponse> res = new ArrayList<>();
        AppUser user = authService.getCurrentUser();
        List<Product> productPage = productRepository.findByOwnerId(user);
        productPage.forEach(product -> {
            res.add(abstractionMapper.map(product));
            log.info("Product #{}", product.getProductId());
        });
        // log.info("Products To Be Sent: {}", res.size());
        return res;
    }

    public EditableProductInfoResponse getSpecificProduct(final Long id) {
        Product product = productRepository.getById(id);
        EditableProductInfoResponse productInfoResponse = new EditableProductInfoResponse();
        productInfoResponse.setBasicInfo(productBasicInfoToRequestMapper.map(product.getBasicInfo()));
        List<String> keyFeatures = product.getDescription().getKeyFeatures();
        // log.info("{}", keyFeatures.get(0));
        productInfoResponse.setDescription(
                new DescriptionRequest(
                        product.getDescription().getShortDescription(),
                        product.getDescription().getDescription(),
                        keyFeatures
                )
        );
        List<byte[]> images = new ArrayList<>(6);
        product.getImageList().forEach((productImage -> {
            images.add(productImage.getImage());
            // log.info("Image: {}", productImage);
        }));
        productInfoResponse.setImages(images);
        // Removing this line makes an Error 500 :)
        log.info("Final: {}", productInfoResponse);
        return productInfoResponse;
    }
}
