package com.example.backend.dtos;

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