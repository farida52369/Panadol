package com.example.panadol.dto.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReviewRequest {
    private String name;
    @NotBlank
    private Long productId;
    @NotBlank
    private Double rate;
    @NotBlank
    private String comment;
}
