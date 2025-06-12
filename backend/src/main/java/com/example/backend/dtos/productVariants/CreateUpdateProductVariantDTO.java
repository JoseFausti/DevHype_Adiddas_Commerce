package com.example.backend.dtos.productVariants;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUpdateProductVariantDTO {
    private String productName;
    private double sizeNumber;  
    private String colorName; 
    private int stock;
}
