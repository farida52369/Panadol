package com.example.panadol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/filter")
public class FilterController {
    /*
    private final FilterService filterService;

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{category}"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getAllProductsMatchWithBy(@PathVariable String category) {
        log.info("Getting All Products Match With Category {} .. ", category);
        return ResponseEntity.ok().body(filterService.getProductsByCategory(category));
    }
    */
}
