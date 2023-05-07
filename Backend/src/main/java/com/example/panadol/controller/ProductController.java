package com.example.panadol.controller;

import com.example.panadol.dto.product.BasicInfoRequest;
import com.example.panadol.dto.product.DescriptionRequest;
import com.example.panadol.dto.product.EditableProductInfoResponse;
import com.example.panadol.dto.product.SomeProductInfoResponse;
import com.example.panadol.service.product.CreateProduct;
import com.example.panadol.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;
    private final CreateProduct createProduct;

    @PostMapping(
            consumes = {"multipart/form-data", "application/json"},
            value = "/create"
    )
    public ResponseEntity<?> createProduct(
            @RequestPart("basicInfo") BasicInfoRequest basicInfoRequest,
            @RequestPart("description") DescriptionRequest descriptionRequest,
            @RequestPart("images") MultipartFile[] image) {
        try {
            createProduct.saveNewProduct(basicInfoRequest, descriptionRequest, image);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<SomeProductInfoResponse>> getAllProducts(
            @RequestParam("offset") int offset,
            @RequestParam("limit") int limit
    ) {
        // log.info("Getting All Products .. ");
        return ResponseEntity.ok().body(productService.getAllProducts(offset, limit));
    }

    @GetMapping(value = "/my-products")
    public ResponseEntity<List<SomeProductInfoResponse>> getCurrentUserProducts() {
        log.info("Getting All Products .. ");
        return ResponseEntity.ok().body(productService.getCurrentUserProducts());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<EditableProductInfoResponse> getSpecificProduct(@PathVariable Long id) {
        log.info("Getting Specific Product .. ");
        return ResponseEntity.ok().body(productService.getSpecificProduct(id));
    }

    @PutMapping(
            consumes = {"multipart/form-data", "application/json"},
            value = "/edit"
    )
    public ResponseEntity<?> editProduct(
            @RequestPart("productId") Long productId,
            @RequestPart("basicInfo") BasicInfoRequest basicInfoRequest,
            @RequestPart("description") DescriptionRequest descriptionRequest,
            @RequestPart("images") MultipartFile[] images) {
        createProduct.editProduct(productId, basicInfoRequest, descriptionRequest, images);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}


