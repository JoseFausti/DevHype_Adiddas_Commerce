package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.entities.ProductVariants;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ProductVariantsRepository;

@Service
public class ProductVariantsServiceImpl extends BaseServiceImpl<ProductVariants, Long> implements ProductVariantsService{

    @Autowired
    private ProductVariantsRepository productVariantsRepository;

    public ProductVariantsServiceImpl(BaseRepository<ProductVariants, Long> baseRepository) {
        super(baseRepository);
    }
    
}
