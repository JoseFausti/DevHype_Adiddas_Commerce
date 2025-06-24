package com.example.backend.mappers;

import com.example.backend.dtos.TypeDTO;
import com.example.backend.dtos.category.CategoryDTO;
import com.example.backend.models.entities.Categories;
import com.example.backend.models.entities.Types;

public class TypeMapper {

   public static TypeDTO toDto(Types type) {
        if (type == null) return null;

        return TypeDTO.builder()
            .id(type.getId())
            .name(type.getName())
            .categoryId(type.getCategory().getId())
            .build();
    }

    public static Types toEntity(TypeDTO dto, Categories category) {
        if (dto == null || category == null) return null;

        return Types.builder()
            .name(dto.getName())
            .category(category)
            .build();
    }
}