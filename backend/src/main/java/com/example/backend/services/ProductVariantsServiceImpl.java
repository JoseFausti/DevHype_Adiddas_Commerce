package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.ProductVariantDTO;
import com.example.backend.mappers.ProductVariantMapper;
import com.example.backend.models.entities.ProductVariants;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ProductVariantsRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductVariantsServiceImpl extends BaseServiceImpl<ProductVariants, Long> implements ProductVariantsService{

    @Autowired
    private ProductVariantsRepository productVariantsRepository;

    public ProductVariantsServiceImpl(BaseRepository<ProductVariants, Long> baseRepository) {
        super(baseRepository);
    }
    
    @Transactional
    public ProductVariantDTO save(ProductVariantDTO variantDTO) throws Exception {
        ProductVariants variant = ProductVariantMapper.toEntity(variantDTO);
        variant = super.save(variant);
        return ProductVariantMapper.toDto(variant);
    }

    @Transactional
    public ProductVariantDTO update(ProductVariantDTO variantDTO, Long id) throws Exception {
        ProductVariants variant = ProductVariantMapper.toEntity(variantDTO);
        variant = super.update(variant, id);
        return ProductVariantMapper.toDto(variant);
        
    }

    @Transactional
    public ProductVariantDTO getById(Long id) throws Exception {
        ProductVariants variant = super.findById(id);
        return ProductVariantMapper.toDto(variant);
    }

    @Transactional
    public List<ProductVariantDTO> getAll() throws Exception {
        List<ProductVariants> variants = super.findAll();
        return variants.stream().map(ProductVariantMapper::toDto).toList();
    }

}
