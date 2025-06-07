// DiscountMapper.java
package com.example.backend.mappers;

import com.example.backend.models.entities.Discounts;
import com.example.backend.dtos.DiscountDTO;

public class DiscountMapper {

    public static DiscountDTO toDto(Discounts discount) {
        if (discount == null) return null;

        return DiscountDTO.builder()
                .id(discount.getId())
                .percentage(discount.getPercentage())
                .initialDate(discount.getInitialDate())
                .finalDate(discount.getFinalDate())
                .build();
    }

    public static Discounts toEntity(DiscountDTO dto) {
        if (dto == null) return null;

        Discounts discount = Discounts.builder()
                .percentage(dto.getPercentage())
                .initialDate(dto.getInitialDate())
                .finalDate(dto.getFinalDate())
                .build();
        discount.setId(dto.getId());

        return discount;
    }
}