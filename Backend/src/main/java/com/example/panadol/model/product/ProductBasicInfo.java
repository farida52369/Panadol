package com.example.panadol.model.product;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "productBasicInfo")
public class ProductBasicInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "basicInfoId")
    private Long basicInfoId;
    private String title;
    private Double price;
    private Double rate;
    private String category;
    private Integer inStock;

    public ProductBasicInfo() {
        this.rate = 0.0;
    }
}
