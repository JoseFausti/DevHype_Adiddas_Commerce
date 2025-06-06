package com.example.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "product_variant")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariants extends Base {

    @JsonManagedReference(value = "variant-product")
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Products product;

    @JsonManagedReference(value = "variant-color")
    @ManyToOne
    @JoinColumn(name = "color_id")
    private Colors color;

    @JsonManagedReference(value = "variant-size")
    @ManyToOne
    @JoinColumn(name = "size_id")
    private Sizes size;

    @Column(name = "stock")
    private int stock;

    @JsonBackReference(value = "variant-details")
    @OneToMany(mappedBy = "variant", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<Details> details;
}
