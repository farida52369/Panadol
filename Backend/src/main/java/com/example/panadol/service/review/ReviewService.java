package com.example.panadol.service.review;

import com.example.panadol.dto.review.ReviewRequest;
import com.example.panadol.mapper.review.ReviewMapper;
import com.example.panadol.model.product.Product;
import com.example.panadol.repository.review.ReviewRepository;
import com.example.panadol.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {

    private ProductService productService;
    private ReviewRepository reviewRepository;
    private ReviewMapper reviewMapper;

    public void saveReview(final ReviewRequest reviewRequest) {
        // Save Review
        reviewRepository.save(reviewMapper.map(reviewRequest));
    }

    public void updateAverageRating(final Long productId) {
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
}
