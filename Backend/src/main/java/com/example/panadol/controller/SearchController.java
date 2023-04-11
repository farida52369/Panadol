package com.example.panadol.controller;

import com.example.panadol.dto.product.ProductAbstractionRequest;
import com.example.panadol.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    @GetMapping()
    public ResponseEntity<List<ProductAbstractionRequest>> getAllProductsMatchWithBy(
            @RequestParam("searchBy") String searchBy,
            @RequestParam("filterByCategory") String filterByCategory,
            @RequestParam("filterByPrice") String filterByPrice,
            @RequestParam("filterByReview") String filterByReview,
            @RequestParam("offset") String offset,
            @RequestParam("limit") String limit
    ) {
        log.info("{}, {}, {}, {}", searchBy, filterByCategory, filterByPrice, filterByReview);
        return new ResponseEntity<>(
                searchService.getProducts(searchBy, filterByCategory, filterByPrice, filterByReview, offset, limit),
                HttpStatus.OK
        );
    }
}
