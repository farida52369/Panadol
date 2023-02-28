package com.example.panadol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductEdit {
    private Long productId;
    private String title;
    private Double price;
    private String category;
    private Integer inStock;
    private String description;
}
