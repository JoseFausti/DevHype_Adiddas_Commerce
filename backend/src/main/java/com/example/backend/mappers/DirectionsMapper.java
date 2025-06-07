package com.example.backend.mappers;

import com.example.backend.models.entities.Directions;
import com.example.backend.dtos.DirectionsDTO;
import java.util.stream.Collectors;

public class DirectionsMapper {

    public static DirectionsDTO toDto(Directions direction) {
        if (direction == null) return null;

        return DirectionsDTO.builder()
                .id(direction.getId())
                .street(direction.getStreet())
                .number(direction.getNumber())
                .locality(direction.getLocality())
                .city(direction.getCity())
                .country(direction.getCountry())
                .postalCode(direction.getPostalCode())
                .users(direction.getUsers() != null ? direction.getUsers().stream().map(UsersMapper::toDto).collect(Collectors.toList()) : null)
                .build();
    }

    public static Directions toEntity(DirectionsDTO dto) {
        if (dto == null) return null;

        Directions direction = Directions.builder()
                .street(dto.getStreet())
                .number(dto.getNumber())
                .locality(dto.getLocality())
                .city(dto.getCity())
                .country(dto.getCountry())
                .postalCode(dto.getPostalCode())
                .users(dto.getUsers() != null ? dto.getUsers().stream().map(UsersMapper::toEntity).collect(Collectors.toList()) : null)
                .build();
        direction.setId(dto.getId());

        return direction;
    }
}