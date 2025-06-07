// CategoryMapper.java
package com.example.backend.mappers;

import com.example.backend.models.entities.Categories;
import com.example.backend.dtos.CategoryDTO;

public class CategoryMapper {

    public static CategoryDTO toDto(Categories category) {
        if (category == null) return null;

        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

    public static Categories toEntity(CategoryDTO dto) {
        if (dto == null) return null;

        Categories category = Categories.builder()
                .name(dto.getName())
                .build();
        category.setId(dto.getId());

        return category;
    }
}