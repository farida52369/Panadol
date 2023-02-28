package com.example.panadol.repository;

import com.example.panadol.model.Checkout;
import com.example.panadol.model.CompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, CompositeKey> {

    @Query(value =
            "SELECT u.customer_id " +
                    "FROM checkout u " +
                    "WHERE u.date_of_purchase >= DATE_ADD(NOW(),INTERVAL-30 DAY)",
            nativeQuery = true
    )
    List<Long> getTop5CustomersInLast3Months();

    @Query(
            value =
                    "SELECT c.product_id " +
                            "FROM checkout c " +
                            "WHERE c.customer_id = ?1",
            nativeQuery = true
    )
    List<Long> findCustomerPurchases(Long userId);
}
