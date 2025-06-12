package com.example.backend.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.backend.models.entities.Discounts;

@Repository
public interface DiscountsRepository extends BaseRepository<Discounts, Long> {
    
    Optional<Discounts> findByPercentage(double percentage);
}
