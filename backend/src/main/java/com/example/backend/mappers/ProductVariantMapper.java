// ProductVariantMapper.java
package com.example.backend.mappers;

import com.example.backend.dtos.productVariants.ProductVariantDTO;
import com.example.backend.models.entities.ProductVariants;

public class ProductVariantMapper {

    public static ProductVariantDTO toDto(ProductVariants variant) {
        if (variant == null) return null;

        return ProductVariantDTO.builder()
                .id(variant.getId())
                .size(SizeMapper.toDto(variant.getSize()))
                .color(ColorMapper.toDto(variant.getColor()))
                .build();
    }

    public static ProductVariants toEntity(ProductVariantDTO dto) {
        if (dto == null) return null;

        ProductVariants variant = ProductVariants.builder()
                .size(SizeMapper.toEntity(dto.getSize()))
                .color(ColorMapper.toEntity(dto.getColor()))
                .build();
        variant.setId(dto.getId());

        return variant;
    }
}