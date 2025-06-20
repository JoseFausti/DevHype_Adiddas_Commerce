package com.example.backend.services.auth;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.models.auth.AuthResponse;
import com.example.backend.models.auth.LoginRequest;
import com.example.backend.models.auth.RegisterRequest;
import com.example.backend.models.enums.Role;
import com.example.backend.repositories.UserRepository;
import com.example.backend.models.entities.Users;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        Users user = userRepository.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (user.isDeleted()) {
            throw new RuntimeException("Este usuario fue eliminado");
        }

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();
            
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        Optional<Users> optionalUser = userRepository.findByUsername(registerRequest.getUsername());

        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();

            if (user.isDeleted()) {
                // Reactivar y actualizar el usuario eliminado
                user.setUsername(registerRequest.getUsername()); // opcional si no cambia
                user.setName(registerRequest.getName());
                user.setSurname(registerRequest.getSurname());
                user.setEmail(registerRequest.getEmail());
                user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
                user.setDeleted(false);
                user.setRole(Role.USER);
                userRepository.save(user);
            } else {
                // Usuario ya existe y no está eliminado
                throw new RuntimeException("El nombre de usuario ya está en uso.");
            }

            return AuthResponse.builder().token(jwtService.getToken(user)).build();
        }

        // Usuario nuevo
        Users user = Users.builder()
            .username(registerRequest.getUsername())
            .name(registerRequest.getName())
            .surname(registerRequest.getSurname())
            .email(registerRequest.getEmail())
            .password(passwordEncoder.encode(registerRequest.getPassword()))
            .role(Role.USER)
            .build();

        user.setDeleted(false);
        userRepository.save(user);
        return AuthResponse.builder().token(jwtService.getToken(user)).build();
    }

}
