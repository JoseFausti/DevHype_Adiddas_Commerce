package com.example.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.backend.models.entities.Categories;
import com.example.backend.models.entities.Types;


@Repository
public interface TypesRepository extends BaseRepository<Types, Long> {

    boolean existsByNameAndCategoryId(String name, Long categoryId);
    boolean existsByNameAndCategoryIdAndIdNot(String name, Long categoryId, Long id);

    List<Types> findAllByCategoryId(Long categoryId);
    Optional<Types> findByNameAndCategory(String name, Categories category);
}
