package com.example.backend.models.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name= "directions")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
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
    private String postalCode;

    @ManyToMany(mappedBy= "directions")
    private List<Users> users;
}
