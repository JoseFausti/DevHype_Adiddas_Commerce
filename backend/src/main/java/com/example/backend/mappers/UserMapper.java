package com.example.backend.mappers;

import com.example.backend.models.entities.Users;
import com.example.backend.dtos.UserDTO;

import java.util.stream.Collectors;

public class UserMapper {

    public static UserDTO toDto(Users user) {
        if (user == null) return null;

        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .surname(user.getSurname())
                .email(user.getEmail())
                .role(user.getRole())
                .directions(user.getDirections() != null ? user.getDirections().stream().map(DirectionsMapper::toDto).collect(Collectors.toList()) : null)
                .build();
    }

    public static Users toEntity(UserDTO dto) {
        if (dto == null) return null;

        Users user = Users.builder()
                .username(dto.getUsername())
                .name(dto.getName())
                .surname(dto.getSurname())
                .email(dto.getEmail())
                .role(dto.getRole())
                .directions(dto.getDirections() != null ? dto.getDirections().stream().map(DirectionsMapper::toEntity).collect(Collectors.toList()) : null)
                .build();
        user.setId(dto.getId());

        return user;
    }
}