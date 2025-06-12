package com.example.backend.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.backend.models.entities.Products;

@Repository
public interface ProductsRepository extends BaseRepository<Products, Long>{
    
    Optional<Products> findByName(String name);
}
