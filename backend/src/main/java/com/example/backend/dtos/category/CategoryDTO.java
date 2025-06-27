// CategoryDTO.java
package com.example.backend.dtos.category;

import java.util.List;

import com.example.backend.dtos.types.TypeDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {
    private Long id;
    private String name;
    private List<TypeDTO> types;
}
