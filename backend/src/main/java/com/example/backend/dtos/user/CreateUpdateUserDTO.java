package com.example.backend.dtos.user;

import com.example.backend.models.enums.Role;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUpdateUserDTO {
    private String username;
    private String name;
    private String surname;
    private String email;
    private String password;
    private Role role;
    private List<Long> directionIds; // Lista de IDs de direcciones
}
