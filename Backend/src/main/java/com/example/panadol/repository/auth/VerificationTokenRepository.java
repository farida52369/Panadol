package com.example.panadol.repository.auth;

import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.auth.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);

    Optional<VerificationToken> findByUser(AppUser user);

    void deleteByToken(String token);
}
