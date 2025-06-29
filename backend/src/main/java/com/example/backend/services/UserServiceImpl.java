package com.example.backend.services;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.types.TypeDTO;
import com.example.backend.dtos.user.CreateUpdateUserDTO;
import com.example.backend.dtos.user.UserDTO;
import com.example.backend.mappers.TypeMapper;
import com.example.backend.mappers.UserMapper;
import com.example.backend.models.entities.Directions;
import com.example.backend.models.entities.Types;
import com.example.backend.models.entities.Users;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.List;
import java.util.Optional;

import com.example.backend.repositories.DirectionsRepository;

@Service
public class UserServiceImpl extends BaseServiceImpl<Users, Long> implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DirectionsRepository directionsRepository;

    public UserServiceImpl(BaseRepository<Users, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public UserDTO save(CreateUpdateUserDTO dto) throws Exception {
        try {
            if (userRepository.existsByUsername(dto.getUsername())) {
                throw new Exception("Ya existe un usuario con el username: " + dto.getUsername());
            }
            if (userRepository.existsByEmail(dto.getEmail())) {
                throw new Exception("Ya existe un usuario con el email: " + dto.getEmail());
            }

            Users user = new Users();
            user.setUsername(dto.getUsername());
            user.setName(dto.getName());
            user.setSurname(dto.getSurname());
            user.setEmail(dto.getEmail());
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
            user.setRole(dto.getRole());

            if (dto.getDirectionIds() != null && !dto.getDirectionIds().isEmpty()) {
                List<Directions> directions = directionsRepository.findAllById(dto.getDirectionIds());
                user.setDirections(directions);
            }

            user = userRepository.save(user);
            return UserMapper.toDto(user);
        } catch (Exception e) {
            throw new Exception("Error al guardar usuario: " + e.getMessage());
        }
    }

    @Transactional
    public UserDTO update(CreateUpdateUserDTO dto, Long id) throws Exception {
        try {
            Optional<Users> userOptional = userRepository.findById(id);
            if (userOptional.isEmpty()) {
                throw new Exception("Usuario no encontrado con ID: " + id);
            }

            if (userRepository.existsByUsernameAndIdNot(dto.getUsername(), id)) {
                throw new Exception("Ya existe otro usuario con el username: " + dto.getUsername());
            }

            if (userRepository.existsByEmailAndIdNot(dto.getEmail(), id)) {
                throw new Exception("Ya existe otro usuario con el email: " + dto.getEmail());
            }

            Users user = userOptional.get();
            user.setUsername(dto.getUsername());
            user.setName(dto.getName());
            user.setSurname(dto.getSurname());
            user.setEmail(dto.getEmail());
            if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(dto.getPassword()));
            }
            user.setRole(dto.getRole());

            if (dto.getDirectionIds() != null) {
                List<Directions> directions = directionsRepository.findAllById(dto.getDirectionIds());
                user.setDirections(directions);
            } else {
                user.setDirections(null);
            }

            user = userRepository.save(user);
            return UserMapper.toDto(user);
        } catch (Exception e) {
            throw new Exception("Error al actualizar usuario: " + e.getMessage());
        }
    }


    @Transactional
    public UserDTO getById(Long id) throws Exception {
        Users user = super.findById(id);
        return UserMapper.toDto(user);
    }

    @Transactional
    public UserDTO findByUsername(String username) {
        Users user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con username: " + username));
        return UserMapper.toDto(user);
    }

    @Transactional
    public List<UserDTO> getAll() throws Exception {
        List<Users> users = super.findAll();
        return users
            .stream()
            .filter(user -> !user.isDeleted())
            .map(UserMapper::toDto)
            .toList();
    }

    @Transactional
    public List<UserDTO> getAllDeleted() throws Exception {
        List<Users> users = super.findAll();
        return users
            .stream()
            .filter(user -> user.isDeleted())
            .map(UserMapper::toDto)
            .toList();
    }

    @Transactional
    public UserDTO backupUser(Long id) throws Exception {
        Users user = super.findById(id);
        user.setDeleted(false);
        return UserMapper.toDto(user);
    }
}