package com.example.panadol.service.review;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {

    /*
     *
    private final ProductService productService;
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    public void saveReview(final ReviewRequest reviewRequest) {
        // Save Review
        reviewRepository.save(reviewMapper.map(reviewRequest));
    }

    public void updateAverageRating(final Long productId) {
        System.out.println(productService);
        System.out.println(productService.getProductById(productId));
        Product product = productService.getProductById(productId);

        // calculate the new average rating for the product
        Double averageRating = 3.8;
        product.getBasicInfo().setRate(averageRating != null ? averageRating : 0.0);
        productService.updateProduct(product);
    }

    public List<ReviewRequest> getAllReviews(final Long productId) {
        Product product = productService.getProductById(productId);
        return reviewRepository.findReviewRequestsByProduct(product);
    }
    */
}
