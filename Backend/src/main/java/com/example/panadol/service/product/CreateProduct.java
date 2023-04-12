package com.example.panadol.service.product;

import com.example.panadol.dto.product.BasicInfoRequest;
import com.example.panadol.dto.product.DescriptionRequest;
import com.example.panadol.exception.PanadolException;
import com.example.panadol.mapper.product.ProductBasicInfoMapper;
import com.example.panadol.model.product.Product;
import com.example.panadol.model.product.ProductBasicInfo;
import com.example.panadol.model.product.ProductDescription;
import com.example.panadol.model.product.ProductImage;
import com.example.panadol.repository.product.ProductBasicInfoRepo;
import com.example.panadol.repository.product.ProductDescriptionRepo;
import com.example.panadol.repository.product.ProductImageRepo;
import com.example.panadol.repository.product.ProductRepository;
import com.example.panadol.service.auth.AuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Date;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class CreateProduct {
    private final ProductRepository productRepository;
    private final ProductBasicInfoRepo basicInfoRepo;
    private final ProductDescriptionRepo descriptionRepo;
    private final ProductImageRepo imageRepo;
    private final AuthService authService;
    private final ProductBasicInfoMapper basicInfoMapper;

    public void saveNewProduct(
            final BasicInfoRequest basicInfoRequest,
            final DescriptionRequest descriptionRequest,
            final MultipartFile[] images
    ) {
        final Product product = new Product();
        helperToSaveOrEditProducts(product, basicInfoRequest, descriptionRequest, images);
    }

    public void editProduct(
            final Long productId,
            final BasicInfoRequest basicInfoRequest,
            final DescriptionRequest descriptionRequest,
            final MultipartFile[] images
    ) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new PanadolException("Product Not Found")
        );
        helperToSaveOrEditProducts(product, basicInfoRequest, descriptionRequest, images);
    }

    private void helperToSaveOrEditProducts(
            final Product product,
            final BasicInfoRequest basicInfoRequest,
            final DescriptionRequest descriptionRequest,
            final MultipartFile[] images
    ) {
        // Basic Info Table
        final ProductBasicInfo basicInfo = basicInfoMapper.map(basicInfoRequest);
        basicInfoRepo.save(basicInfo);
        product.setBasicInfo(basicInfo);
        // Description Table
        final ProductDescription description = getProductDescription(descriptionRequest);
        descriptionRepo.save(description);
        product.setDescription(description);
        // Owner
        product.setOwnerId(authService.getCurrentUser());
        // Created Time
        product.setCreatedDate(new Date(System.currentTimeMillis()));
        productRepository.save(product);
        // Images
        productImages(images, product);
        log.info("Added new product to the App!!");
    }

    private ProductDescription getProductDescription(DescriptionRequest descriptionRequest) {
        ProductDescription description = new ProductDescription();
        description.setDescription(descriptionRequest.getDescription());
        description.setKeyFeatures(descriptionRequest.getKeyFeatures());
        return description;
    }

    private void productImages(MultipartFile[] images, Product product) {
        for (final MultipartFile file : images) {
            try {
                final ProductImage productImage = new ProductImage();
                productImage.setImage(file.getBytes());
                productImage.setProductId(product);
                imageRepo.save(productImage);
                product.getImageList().add(productImage);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
