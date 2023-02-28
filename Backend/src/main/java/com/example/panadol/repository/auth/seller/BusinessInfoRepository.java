package com.example.panadol.repository.auth.seller;

import com.example.panadol.model.auth.seller.BusinessInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessInfoRepository extends JpaRepository<BusinessInfo, Long> {
}
