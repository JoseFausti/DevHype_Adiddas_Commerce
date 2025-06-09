// ProductVariantDTO.java
package com.example.backend.dtos.productVariants;

import com.example.backend.dtos.ColorDTO;
import com.example.backend.dtos.SizeDTO;
import com.example.backend.dtos.products.ProductDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantDTO {
    private Long id;
    private ProductDTO product;
    private SizeDTO size;
    private ColorDTO color;
    private int stock;
}