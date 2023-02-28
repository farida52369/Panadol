package com.example.panadol.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BasicInfoRequest {
    @NotBlank
    private String title;
    @NotBlank
    @DecimalMin(value = "0.0")
    private Double price;
    @NotBlank
    @Min(value = 1)
    private Integer inStock;
    @NotBlank
    private String category;
}
