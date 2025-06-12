package com.example.backend.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.backend.models.entities.Colors;

@Repository
public interface ColorsRepository extends BaseRepository<Colors, Long>{

    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name, Long id);

    Optional<Colors> findByName(String name);
}
