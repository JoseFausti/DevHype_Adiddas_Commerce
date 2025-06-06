package com.example.backend.models.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(
    name = "categoria",
    uniqueConstraints = @UniqueConstraint(columnNames = {"name"})    
)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Categories extends Base {
    
    @Column(name = "name", unique = true)
    private String name;

    @JsonBackReference(value = "category-product")
    @OneToMany(mappedBy = "category", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<Products> products;

    @JsonBackReference(value = "category-type")
    @OneToMany(mappedBy = "category", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<Types> types;
}
