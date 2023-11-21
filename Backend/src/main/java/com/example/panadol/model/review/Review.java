package com.example.panadol.model.review;

import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.product.Product;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewId")
    private Long reviewId;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner", referencedColumnName = "userId")
    private AppUser owner;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product", referencedColumnName = "productId")
    private Product product;
    private Double rate;
    @Lob
    private String comment;
    private Date createdDate;
}
