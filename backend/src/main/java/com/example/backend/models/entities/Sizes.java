package com.example.backend.models.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Sizes extends Base{

    @Column(name = "size")
    private double size;

    @OneToMany(mappedBy = "size", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ProductVariants> productVariants;
}
