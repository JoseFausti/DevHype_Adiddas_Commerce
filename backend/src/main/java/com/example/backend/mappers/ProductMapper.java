// ProductMapper.java
package com.example.backend.mappers;

import com.example.backend.models.entities.*;
import com.example.backend.dtos.products.ProductDTO;

import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {

    public static ProductDTO toDto(Products product) {
        if (product == null) return null;

        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .image(product.getImage())
                .description(product.getDescription())
                .brand(product.getBrand())
                .price(product.getPrice())
                .category(CategoryMapper.toDto(product.getCategory()))
                .type(TypeMapper.toDto(product.getType()))
                .discounts(product.getDiscounts() != null ? product.getDiscounts().stream().map(DiscountMapper::toDto).collect(Collectors.toList()) : null)
                .productVariants(product.getProductVariants() != null ? product.getProductVariants().stream().map(ProductVariantMapper::toDto).collect(Collectors.toList()) : null)
                .build();
    }

    public static Products toEntity(ProductDTO dto) {
        if (dto == null) return null;

        Products product = Products.builder()
                .name(dto.getName())
                .image(dto.getImage())
                .description(dto.getDescription())
                .brand(dto.getBrand())
                .price(dto.getPrice())
                .category(CategoryMapper.toEntity(dto.getCategory()))
                .type(TypeMapper.toEntity(dto.getType()))
                .discounts(dto.getDiscounts() != null ? dto.getDiscounts().stream().map(DiscountMapper::toEntity).collect(Collectors.toList()) : null)
                .productVariants(dto.getProductVariants() != null ? dto.getProductVariants().stream().map(ProductVariantMapper::toEntity).collect(Collectors.toList()) : null)
                .build();
        product.setId(dto.getId());

        return product;
    }
}