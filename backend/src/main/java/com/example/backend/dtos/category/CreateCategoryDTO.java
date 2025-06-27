package com.example.backend.dtos.category;

import java.util.List;

import com.example.backend.dtos.types.CreateTypeDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCategoryDTO {
    private String name;
    private List<CreateTypeDTO> types;
}
