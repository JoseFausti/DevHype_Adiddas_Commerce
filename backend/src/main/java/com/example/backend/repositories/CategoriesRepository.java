package com.example.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.models.entities.Categories;

@Repository
public interface  CategoriesRepository extends BaseRepository<Categories, Long> {
    // JPA genera las consultas automaticamente por el nombre de la funcion y los parametros (Query Method Naming Strategy).
    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name, Long id);

    Optional<Categories> findByName(String name);
    @Query("SELECT c FROM Categories c LEFT JOIN FETCH c.types WHERE c.name = :name AND c.deleted = false")
    Optional<Categories> findByNameWithTypes(@Param("name") String name);
}
