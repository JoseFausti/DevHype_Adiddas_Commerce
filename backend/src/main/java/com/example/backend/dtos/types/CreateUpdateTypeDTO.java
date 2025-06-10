package com.example.backend.dtos.types;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUpdateTypeDTO {
    private String name;
    private String categoryName;
}