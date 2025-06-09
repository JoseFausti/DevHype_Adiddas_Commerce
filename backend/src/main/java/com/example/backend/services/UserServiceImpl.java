package com.example.backend.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.user.UserDTO;
import com.example.backend.mappers.UserMapper;
import com.example.backend.models.entities.Users;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl extends BaseServiceImpl<Users, Long> implements UserService {

    @Autowired
    private UserRepository userRepository;

    public UserServiceImpl(BaseRepository<Users, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public UserDTO save(UserDTO userDTO) throws Exception {
        try {
            if (userRepository.existsByUsername(userDTO.getUsername())) {
                throw new Exception("Ya existe un usuario con el username: " + userDTO.getUsername());
            }
            if (userRepository.existsByEmail(userDTO.getEmail())) {
                throw new Exception("Ya existe un usuario con el email: " + userDTO.getEmail());
            }

            Users user = UserMapper.toEntity(userDTO);
            user = userRepository.save(user);
            return UserMapper.toDto(user);
        } catch (Exception e) {
            throw new Exception("Error al guardar usuario: " + e.getMessage());
        }
    }

    @Transactional
    public UserDTO update(UserDTO userDTO, Long id) throws Exception {
        try {
            Optional<Users> userOptional = userRepository.findById(id);
            if (!userOptional.isPresent()) {
                throw new Exception("Usuario no encontrado con ID: " + id);
            }

            if (userRepository.existsByUsernameAndIdNot(userDTO.getUsername(), id)) {
                throw new Exception("Ya existe otro usuario con el username: " + userDTO.getUsername());
            }

            if (userRepository.existsByEmailAndIdNot(userDTO.getEmail(), id)) {
                throw new Exception("Ya existe otro usuario con el email: " + userDTO.getEmail());
            }

            Users user = UserMapper.toEntity(userDTO);
            user.setId(id);
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
    public List<UserDTO> getAll() throws Exception {
        List<Users> users = super.findAll();
        return users.stream().map(UserMapper::toDto).toList();
    }
}