package com.example.panadol.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DescriptionRequest {
    @NotBlank
    private String description;
    @Size(min = 1)
    private List<String> keyFeatures;
}
