// ProductDTO.java
package com.example.backend.dtos.products;

import lombok.*;
import java.util.List;

import com.example.backend.dtos.DiscountDTO;
import com.example.backend.dtos.TypeDTO;
import com.example.backend.dtos.category.CategoryDTO;
import com.example.backend.dtos.productVariants.ProductVariantDTO;

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
    private TypeDTO type;
    private List<DiscountDTO> discounts;
    private List<ProductVariantDTO> productVariants;
}