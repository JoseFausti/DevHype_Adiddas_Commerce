package com.example.backend.models.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(
    name = "sizes",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"size"})}
)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Sizes extends Base{

    @Column(name = "size")
    private double size;

    @JsonBackReference(value = "variant-size")
    @OneToMany(mappedBy = "size", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<ProductVariants> productVariants;
}
