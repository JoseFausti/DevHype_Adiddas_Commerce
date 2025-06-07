// Product in cart
package com.example.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "details")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Details extends Base {
    
    @Column(name = "quantity")
    private int quantity;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "variant_id")
    private ProductVariants variant;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "purchase_order_id")
    private Purchase_orders purchaseOrder;
}
