package com.example.backend.mappers;

import com.example.backend.dtos.detail.DetailDTO;
import com.example.backend.models.entities.Details;

public class DetailMapper {

    public static DetailDTO toDto(Details detail) {
        if (detail == null) return null;

        return DetailDTO.builder()
                .id(detail.getId())
                .quantity(detail.getQuantity())
                .variant(ProductVariantMapper.toDto(detail.getVariant()))
                .build();
    }

    public static Details toEntity(DetailDTO dto) {
        if (dto == null) return null;

        Details detail = Details.builder()
                .quantity(dto.getQuantity())
                .variant(ProductVariantMapper.toEntity(dto.getVariant()))
                .build();
        detail.setId(dto.getId());

        return detail;
    }
}