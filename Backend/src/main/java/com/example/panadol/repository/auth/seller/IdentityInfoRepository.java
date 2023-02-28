package com.example.panadol.repository.auth.seller;

import com.example.panadol.model.auth.seller.IdentityInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdentityInfoRepository extends JpaRepository<IdentityInfo, Long> {
}
