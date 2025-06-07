package com.example.backend.repositories;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.backend.models.entities.Colors;
import com.example.backend.models.entities.ProductVariants;

@Repository
public interface  ProductVariantsRepository extends BaseRepository<ProductVariants, Long> {
    
    List<ProductVariants> findByColor(Colors color);
}
