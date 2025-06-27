package com.example.backend.dtos.types;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypeDTO {
    private Long id;
    private String name;
    private Long categoryId;
}