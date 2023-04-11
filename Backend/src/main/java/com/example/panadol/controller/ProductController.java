package com.example.panadol.controller;

import com.example.panadol.dto.product.BasicInfoRequest;
import com.example.panadol.dto.product.DescriptionRequest;
import com.example.panadol.dto.product.ProductAbstractionRequest;
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
    public ResponseEntity<List<ProductAbstractionRequest>> getAllProducts(
            @RequestParam("offset") int offset,
            @RequestParam("limit") int limit
    ) {
        // log.info("Getting All Products .. ");
        return ResponseEntity.ok().body(productService.getAllProducts(offset, limit));
    }

    /*
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{id}"
    )
    public ResponseEntity<ProductResponse> getSpecificProduct(@PathVariable Long id) {
        log.info("Getting Specific Product .. ");
        return ResponseEntity.ok().body(productService.getSpecificProduct(id));
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{productId}/owner/{email}"
    )
    public ResponseEntity<ProductAllInfo> isUserTheOwnerOfThisProduct(@PathVariable Long productId, @PathVariable String email) {
        return new ResponseEntity<>(productService.productAllInfo(productId, email), HttpStatus.OK);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            consumes = {"application/json"},
            value = "/edit"
    )
    public ResponseEntity<?> editProduct(@RequestBody ProductEdit productEdit) {
        productService.editProduct(productEdit);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    */
}


