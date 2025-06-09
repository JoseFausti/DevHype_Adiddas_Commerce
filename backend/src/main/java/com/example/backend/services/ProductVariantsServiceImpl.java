package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.productVariants.CreateUpdateProductVariantDTO;
import com.example.backend.dtos.productVariants.ProductVariantDTO;
import com.example.backend.mappers.ProductVariantMapper;
import com.example.backend.models.entities.ProductVariants;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ProductVariantsRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductVariantsServiceImpl extends BaseServiceImpl<ProductVariants, Long> implements ProductVariantsService{

    @Autowired
    private ProductVariantsRepository productVariantsRepository;

    @Autowired
    private ProductsService productsService;

    @Autowired
    private ColorsService colorsService;

    @Autowired
    private SizesService sizesService;

    public ProductVariantsServiceImpl(BaseRepository<ProductVariants, Long> baseRepository) {
        super(baseRepository);
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

    @Transactional
    public ProductVariantDTO save(CreateUpdateProductVariantDTO  dto) throws Exception {
        ProductVariants variant = new ProductVariants();
        
        variant.setProduct(productsService.findById(dto.getProductId()));
        variant.setColor(colorsService.findById(dto.getColorId()));
        variant.setSize(sizesService.findById(dto.getSizeId()));
        variant.setStock(dto.getStock());

        variant = super.save(variant);
        return ProductVariantMapper.toDto(variant);
    }

    @Transactional
    public ProductVariantDTO update(CreateUpdateProductVariantDTO dto, Long id) throws Exception {
        ProductVariants variant = super.findById(id); // traemos el existente

        variant.setProduct(productsService.findById(dto.getProductId()));
        variant.setColor(colorsService.findById(dto.getColorId()));
        variant.setSize(sizesService.findById(dto.getSizeId()));
        variant.setStock(dto.getStock());

        variant = super.update(variant, id);
        return ProductVariantMapper.toDto(variant);
    }
}

