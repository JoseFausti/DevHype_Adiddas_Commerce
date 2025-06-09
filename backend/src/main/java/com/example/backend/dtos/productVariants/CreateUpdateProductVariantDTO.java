package com.example.backend.dtos.productVariants;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUpdateProductVariantDTO {
    private Long productId;
    private Long sizeId;  // id del size
    private Long colorId; // id del color
    private int stock;
}
