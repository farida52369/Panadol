package com.example.panadol.repository.product;

import com.example.panadol.model.product.ProductBasicInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductBasicInfoRepo extends JpaRepository<ProductBasicInfo, Long> {
}
