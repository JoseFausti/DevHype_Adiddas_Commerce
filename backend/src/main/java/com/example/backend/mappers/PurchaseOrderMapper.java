package com.example.backend.mappers;

import com.example.backend.dtos.purchaseOrder.PurchaseOrderDTO;
import com.example.backend.models.entities.Purchase_orders;

import java.util.stream.Collectors;

public class PurchaseOrderMapper {

    public static PurchaseOrderDTO toDto(Purchase_orders purchaseOrder) {
        if (purchaseOrder == null) return null;

        return PurchaseOrderDTO.builder()
                .id(purchaseOrder.getId())
                .date(purchaseOrder.getDate())
                .totalPrice(purchaseOrder.getTotalPrice())
                .paymentMethod(purchaseOrder.getPaymentMethod())
                .status(purchaseOrder.getStatus())
                .user(UserMapper.toDto(purchaseOrder.getUser()))
                .details(purchaseOrder.getDetails() != null ? purchaseOrder.getDetails().stream().map(DetailMapper::toDto).collect(Collectors.toList()) : null)
                .build();
    }

    public static Purchase_orders toEntity(PurchaseOrderDTO dto) {
        if (dto == null) return null;

        Purchase_orders purchaseOrder = Purchase_orders.builder()
                .date(dto.getDate())
                .totalPrice(dto.getTotalPrice())
                .paymentMethod(dto.getPaymentMethod())
                .status(dto.getStatus())
                .user(UserMapper.toEntity(dto.getUser()))
                .details(dto.getDetails() != null ? dto.getDetails().stream().map(DetailMapper::toEntity).collect(Collectors.toList()) : null)
                .build();
        purchaseOrder.setId(dto.getId());

        return purchaseOrder;
    }
}