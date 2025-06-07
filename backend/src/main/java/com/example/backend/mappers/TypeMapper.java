package com.example.backend.mappers;

import com.example.backend.models.entities.Types;
import com.example.backend.dtos.TypeDTO;

public class TypeMapper {

    public static TypeDTO toDto(Types type) {
        if (type == null) return null;

        return TypeDTO.builder()
                .id(type.getId())
                .name(type.getName())
                .category(CategoryMapper.toDto(type.getCategory()))
                .build();
    }

    public static Types toEntity(TypeDTO dto) {
        if (dto == null) return null;

        Types type = Types.builder()
                .name(dto.getName())
                .category(CategoryMapper.toEntity(dto.getCategory()))
                .build();
        type.setId(dto.getId());

        return type;
    }
}