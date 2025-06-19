// CategoryMapper.java
package com.example.backend.mappers;

import java.util.stream.Collectors;

import com.example.backend.dtos.category.CategoryDTO;
import com.example.backend.models.entities.Categories;

import com.example.backend.models.entities.Types;
import java.util.List;

public class CategoryMapper {

    public static CategoryDTO toDto(Categories category) {
        if (category == null) return null;

        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .types(category.getTypes() != null ? category.getTypes().stream().map(TypeMapper::toDto).collect(Collectors.toList()) : null)
                .build();
    }

    public static Categories toEntity(CategoryDTO dto) {
        if (dto == null) return null;

        Categories category = Categories.builder()
                .name(dto.getName())
                .build();
        category.setId(dto.getId());

        if (dto.getTypes() != null) {
            List<Types> types = dto.getTypes().stream()
                .map(TypeMapper::toEntity)
                .collect(Collectors.toList());
            for (Types type : types) {
                type.setCategory(category); // muy importante para mantener la relación bidireccional
            }
            category.setTypes(types);
        }

        return category;
    }
}