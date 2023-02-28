package com.example.panadol.repository.auth.seller;

import com.example.panadol.model.auth.seller.NationalId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NationalIdRepository extends JpaRepository<NationalId, String> {
}
