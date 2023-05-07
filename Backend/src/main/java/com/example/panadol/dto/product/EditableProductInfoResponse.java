package com.example.panadol.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EditableProductInfoResponse {
    private BasicInfoRequest basicInfo;
    private DescriptionRequest description;
    private List<byte[]> images;
}
