package com.example.backend.dtos;

import com.example.backend.models.enums.Role;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String name;
    private String surname;
    private String email;
    private Role role;
    private List<DirectionsDTO> directions;
}