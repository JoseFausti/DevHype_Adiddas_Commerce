package com.example.backend.dtos.products;

import lombok.*;

import java.util.List;

import com.example.backend.dtos.productVariants.CreateUpdateProductVariantDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUpdateProductDTO {
    private String name;
    private String image;
    private String description;
    private String brand;
    private double price;

    private String categoryName;

    private String typeName;

    private List<Double> discountPercentages; // porcentajes opcionales de descuentos

    private List<CreateUpdateProductVariantDTO> productVariants; // variantes con solo ids
}
