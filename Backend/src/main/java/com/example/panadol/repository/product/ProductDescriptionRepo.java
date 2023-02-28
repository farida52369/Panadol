package com.example.panadol.repository.product;

import com.example.panadol.model.product.ProductDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDescriptionRepo extends JpaRepository<ProductDescription, Long> {
}
