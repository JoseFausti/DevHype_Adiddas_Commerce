package com.example.backend.models.entities;

import java.time.LocalDate;

import com.example.backend.models.enums.PaymentMethod;
import com.example.backend.models.enums.Status;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "purchase_orders")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Purchase_orders extends Base {
    
    @Column(name = "date")
    private LocalDate date;

    @Column(name= "total_price")
    private double totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @JsonManagedReference(value = "order-user")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @JsonBackReference(value = "order-details")
    @OneToMany(mappedBy = "purchaseOrder")
    private List<Details> details;
}
