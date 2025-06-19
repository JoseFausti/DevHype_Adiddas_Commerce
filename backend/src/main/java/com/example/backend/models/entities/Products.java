package com.example.backend.models.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Products extends Base {

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "description")
    private String description;

    @Column(name = "brand")
    private String brand;

    @Column(name = "price")
    private double price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Categories category;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Types type;

    @ManyToMany
    @JoinTable(
            name = "product_discounts",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "discount_id")
    )
    private List<Discounts> discounts;

    @OneToMany(mappedBy = "product", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ProductVariants> productVariants;
}

