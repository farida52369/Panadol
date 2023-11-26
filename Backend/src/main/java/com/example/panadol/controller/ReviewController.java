package com.example.panadol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ReviewController {

    /*
     *
    private final ReviewService reviewService;

    @PostMapping(
            consumes = {"application/json"},
            value = "/send-review"
    )
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest reviewRequest) {
        try {
            reviewService.saveReview(reviewRequest);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/reviews/{productId}")
    public ResponseEntity<List<ReviewRequest>> getAllProductReviews(@PathVariable Long productId) {
        // log.info("Getting All Products .. ");
        return ResponseEntity.ok().body(reviewService.getAllReviews(productId));
    }
    */
}
