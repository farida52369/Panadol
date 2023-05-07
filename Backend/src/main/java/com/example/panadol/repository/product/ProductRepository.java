package com.example.panadol.repository.product;

import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByOwnerId(AppUser user);
}
