// SizeMapper.java
package com.example.backend.mappers;

import com.example.backend.models.entities.Sizes;
import com.example.backend.dtos.SizeDTO;

public class SizeMapper {

    public static SizeDTO toDto(Sizes size) {
        if (size == null) return null;

        return SizeDTO.builder()
                .id(size.getId())
                .size(size.getSize())
                .build();
    }

    public static Sizes toEntity(SizeDTO dto) {
        if (dto == null) return null;

        Sizes size = Sizes.builder()
                .size(dto.getSize())
                .build();

        size.setId(dto.getId());
        return size;
    }
}
