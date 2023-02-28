package com.example.panadol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    /*
    private final SearchService searchService;

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{by}"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getAllProductsMatchWithBy(@PathVariable String by) {
        log.info("Getting All Products Match With {} .. ", by);
        return ResponseEntity.ok().body(searchService.getProductsWhenSearchBy(by));
    }
    */
}
