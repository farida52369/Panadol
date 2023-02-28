package com.example.panadol.dto.auth.seller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BusinessInfoRequest {
    @NotBlank
    private String country;
    @NotBlank
    private String governorate;
    @NotBlank
    private String city;
    @NotBlank
    private String area;
    @NotBlank
    private String street;
    @NotBlank
    private String apartment;
    @NotBlank
    private String uniqueBusinessName;
}
