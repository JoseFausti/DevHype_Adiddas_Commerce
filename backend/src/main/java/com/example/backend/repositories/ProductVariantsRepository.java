package com.example.backend.repositories;

import org.springframework.stereotype.Repository;

import com.example.backend.models.entities.ProductVariants;

@Repository
public interface  ProductVariantsRepository extends BaseRepository<ProductVariants, Long> {
    
}
