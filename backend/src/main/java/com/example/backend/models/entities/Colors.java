package com.example.backend.models.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "colors",
    uniqueConstraints = @jakarta.persistence.UniqueConstraint(columnNames = "name")
)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Colors extends Base{

    @Column(name = "name")
    private String name;
    
    @JsonBackReference(value = "variant-color")
    @OneToMany(mappedBy = "color", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<ProductVariants> productVariants;

}
