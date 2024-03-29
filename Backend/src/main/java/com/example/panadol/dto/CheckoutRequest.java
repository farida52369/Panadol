package com.example.panadol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutRequest {
    private String customer;
    private List<CheckoutProductInfo> products;
}
