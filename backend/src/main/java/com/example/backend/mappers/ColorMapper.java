// ColorMapper.java
package com.example.backend.mappers;

import com.example.backend.models.entities.Colors;
import com.example.backend.dtos.ColorDTO;

public class ColorMapper {

    public static ColorDTO toDto(Colors color) {
        if (color == null) return null;

        return ColorDTO.builder()
                .id(color.getId())
                .name(color.getName())
                .build();
    }

    public static Colors toEntity(ColorDTO dto) {
        if (dto == null) return null;

        Colors color = Colors.builder()
                .name(dto.getName())
                .build();
        color.setId(dto.getId());
        return color;
    }
}
