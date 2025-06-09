// ProductDTO.java
package com.example.backend.dtos;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String image;
    private String description;
    private String brand;
    private double price;
    private CategoryDTO category;
    private List<DiscountDTO> discounts;
    private List<ProductVariantDTO> productVariants;
}