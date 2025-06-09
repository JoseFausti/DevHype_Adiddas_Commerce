package com.example.backend.models.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "directions",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {
            "street", "number", "locality", "city", "country", "postal_code"
        })
    }
)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Directions extends Base {

    @Column(name = "street")
    private String street;

    @Column(name = "number")
    private int number;

    @Column(name = "locality")
    private String locality;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    @Column(name = "postal_code")
    private int postalCode;

    @ManyToMany(mappedBy = "directions", fetch= FetchType.LAZY)
    private List<Users> users;
}
