package com.example.backend.dtos.types;

import com.example.backend.dtos.CategoryDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypeDTO {
    private Long id;
    private String name;
    private CategoryDTO category;
}