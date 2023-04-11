package com.example.panadol.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductAbstractionRequest {
    private String productId;
    private byte[] image;
    private String title;
    private String rate;
    private String price;
    private String inStock;
}
