package com.example.backend.dtos.detail;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUpdateDetailDTO {
    private int quantity;
    private Long variantId;
    private Long purchaseOrderId;
}
