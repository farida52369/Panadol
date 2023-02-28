package com.example.panadol.model.product;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "productBasicInfo")
public class ProductBasicInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "basicInfoId")
    private Long basicInfoId;
    private String title;
    private Double price;
    private String category;
    private Integer inStock;
}
