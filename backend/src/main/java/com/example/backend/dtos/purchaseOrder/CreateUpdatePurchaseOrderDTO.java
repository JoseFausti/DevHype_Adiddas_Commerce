package com.example.backend.dtos.purchaseOrder;

import com.example.backend.dtos.detail.CreateUpdateDetailDTO;
import com.example.backend.models.enums.PaymentMethod;

import lombok.*;

import java.util.List;

import com.example.backend.models.enums.Status;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUpdatePurchaseOrderDTO {
    private PaymentMethod paymentMethod;
    private Status status;
    private Long userId; // ID del usuario
    private List<CreateUpdateDetailDTO> details;
}
