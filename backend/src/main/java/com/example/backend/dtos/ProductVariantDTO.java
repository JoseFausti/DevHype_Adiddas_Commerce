// ProductVariantDTO.java
package com.example.backend.dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantDTO {
    private Long id;
    private SizeDTO size;
    private ColorDTO color;
    private int stock;
}