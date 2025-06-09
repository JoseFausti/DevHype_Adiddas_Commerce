package com.example.backend.controllers;

import java.util.List;

import com.example.backend.models.entities.Types;
import com.example.backend.services.TypesServiceImpl;

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

import com.example.backend.dtos.TypeDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/types")
public class TypesController {

     @Autowired
    private TypesServiceImpl typesService;

    @GetMapping("/{id}")
    public ResponseEntity<TypeDTO> getTypeById(@PathVariable Long id) throws Exception {
        TypeDTO typesDTO = typesService.getById(id);
        return ResponseEntity.ok(typesDTO);
    }

    @GetMapping
    public ResponseEntity<List<TypeDTO>> getAllTypes() throws Exception {
        List<TypeDTO> typesDTOs = typesService.getAll();
        return ResponseEntity.ok(typesDTOs);
    }

    @PostMapping
    public ResponseEntity<TypeDTO> createType(@RequestBody TypeDTO typeDTO) throws Exception {
        TypeDTO createdType = typesService.save(typeDTO);
        return ResponseEntity.ok(createdType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypeDTO> updateType(@PathVariable Long id, @RequestBody TypeDTO typeDTO) throws Exception {
        TypeDTO updatedType = typesService.update(typeDTO, id);
        return ResponseEntity.ok(updatedType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(typesService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
