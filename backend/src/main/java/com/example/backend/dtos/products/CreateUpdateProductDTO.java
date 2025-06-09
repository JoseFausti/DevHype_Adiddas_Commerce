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

    private Long categoryId; // solo el id de categoría

    private List<Long> discountIds; // ids opcionales de descuentos

    private List<CreateUpdateProductVariantDTO> productVariants; // variantes con solo ids
}
