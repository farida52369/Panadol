package com.example.panadol.model.product;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "productImage")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imageId")
    private Long imageId;
    @Lob
    // @Column(name = "productImage", length = 1000)
    private byte[] image;
}
