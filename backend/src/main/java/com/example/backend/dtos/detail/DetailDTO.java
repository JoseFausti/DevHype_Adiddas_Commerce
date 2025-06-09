package com.example.backend.dtos.detail;

import com.example.backend.dtos.productVariants.ProductVariantDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailDTO {
    private Long id;
    private int quantity;
    private ProductVariantDTO variant;
}