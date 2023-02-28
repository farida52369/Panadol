package com.example.panadol.repository.auth.seller;

import com.example.panadol.model.auth.seller.Seller;
import com.example.panadol.model.auth.seller.SellerPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, SellerPK> {
}
