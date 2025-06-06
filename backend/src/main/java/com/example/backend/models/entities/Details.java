package com.example.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "details")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Details extends Base {
    
    @Column(name = "quantity")
    private int quantity;

    @JsonManagedReference(value = "variant-details")
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "variant_id")
    private ProductVariants variant;

    @JsonManagedReference(value = "order-details")
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "purchase_order_id")
    private Purchase_orders purchaseOrder;
}
