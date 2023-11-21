package com.example.panadol.repository.review;

import com.example.panadol.dto.review.ReviewRequest;
import com.example.panadol.model.product.Product;
import com.example.panadol.model.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    /*
    @Query("SELECT AVG(r.rating) FROM review r WHERE r.product = :product")
    Double getAverageRatingForProduct(@Param("product") Product product);
    List<Review> findByProduct(Product product);
    */

    @Query("SELECT " +
            "new com.example.panadol.dto.ReviewRequest(r.product.productId, r.text, r.rate, r.comment, u.name) " +
            "FROM review r JOIN r.owner u " +
            "WHERE r.product = :product")
    List<ReviewRequest> findReviewRequestsByProduct(@Param("product") Product product);
}
