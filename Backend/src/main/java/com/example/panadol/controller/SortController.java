package com.example.panadol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/sort")
public class SortController {
    /*
    private final SortService sortService;

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/price"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getAllProductsSortedByPrice() {
        log.info("Getting All Products Sorted By Price ... ");
        return ResponseEntity.ok().body(sortService.getProductsSortedByPrice());
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/in-stock"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getAllProductsSortedByQuantityInStock() {
        log.info("Getting All Products Sorted By Quantity In Stock ... ");
        return ResponseEntity.ok().body(sortService.getProductsSortedByQuantityInStock());
    }
    */
}
