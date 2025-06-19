package com.example.backend.dtos;

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