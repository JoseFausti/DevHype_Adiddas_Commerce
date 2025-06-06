package com.example.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "types",
    uniqueConstraints = @UniqueConstraint(columnNames = "name")
)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Types extends Base {

    @Column(name = "name")
    private String name;

    @JsonManagedReference(value = "category-type")
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Categories category;
}
