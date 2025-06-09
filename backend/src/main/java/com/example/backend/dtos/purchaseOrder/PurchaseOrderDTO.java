package com.example.backend.dtos.purchaseOrder;

import com.example.backend.models.enums.PaymentMethod;
import com.example.backend.models.enums.Status;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

import com.example.backend.dtos.detail.DetailDTO;
import com.example.backend.dtos.user.UserDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseOrderDTO {
    private Long id;
    private LocalDate date;
    private double totalPrice;
    private PaymentMethod paymentMethod;
    private Status status;
    private UserDTO user;
    private List<DetailDTO> details;

}