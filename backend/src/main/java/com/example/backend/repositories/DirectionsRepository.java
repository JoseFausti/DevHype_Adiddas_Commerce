package com.example.backend.repositories;

import org.springframework.stereotype.Repository;

import com.example.backend.models.entities.Directions;

@Repository
public interface DirectionsRepository extends BaseRepository<Directions, Long>{

    boolean existsByStreetAndNumberAndLocalityAndCityAndCountryAndPostalCode(
            String street, int number, String locality, String city, String country, int postalCode
    );

    boolean existsByStreetAndNumberAndLocalityAndCityAndCountryAndPostalCodeAndIdNot(
            String street, int number, String locality, String city, String country, int postalCode, Long id
    );
}
