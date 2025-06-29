package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.user.CreateUpdateUserDTO;
import com.example.backend.dtos.user.UserDTO;
import com.example.backend.models.entities.Users;
import com.example.backend.services.UserServiceImpl;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) throws Exception {
        UserDTO userDTO = userService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(userDTO);
    }

    @GetMapping("/username")
    public ResponseEntity<UserDTO> getUserByUsername(@RequestParam String username) {
        UserDTO userDTO = userService.findByUsername(username);
        return ResponseEntity.status(HttpStatus.OK).body(userDTO);
    }
    

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() throws Exception {
        List<UserDTO> userDTOs = userService.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(userDTOs);
    }

    @GetMapping("/deleted")
    public ResponseEntity<List<UserDTO>> getAllDeletedUsers() throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllDeleted());
    }
    

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUpdateUserDTO dto) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody CreateUpdateUserDTO dto) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(userService.update(dto, id));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(userService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/deleted/{id}")
    public ResponseEntity<?> restoreUser(@PathVariable Long id) throws Exception {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.backupUser(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
