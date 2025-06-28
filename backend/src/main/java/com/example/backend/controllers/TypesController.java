package com.example.backend.controllers;

import java.util.List;

import com.example.backend.dtos.types.TypeDTO;
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

import com.example.backend.dtos.types.CreateTypeDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/types")
public class TypesController {

     @Autowired
    private TypesServiceImpl typesService;

    @GetMapping("/{id}")
    public ResponseEntity<TypeDTO> getTypeById(@PathVariable Long id) throws Exception {
        TypeDTO typesDTO = typesService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(typesDTO);
    }

    @GetMapping
    public ResponseEntity<List<TypeDTO>> getAllTypes() throws Exception {
        List<TypeDTO> typesDTOs = typesService.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(typesDTOs);
    }

    @PostMapping
    public ResponseEntity<TypeDTO> createType(@RequestBody CreateTypeDTO typeDTO) throws Exception {
        TypeDTO createdType = typesService.save(typeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypeDTO> updateType(@PathVariable Long id, @RequestBody TypeDTO typeDTO) throws Exception {
        TypeDTO updatedType = typesService.update(typeDTO, id);
        return ResponseEntity.status(HttpStatus.OK).body(updatedType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(typesService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<TypeDTO>> getTypesByCategoryId(@PathVariable Long categoryId) throws Exception {
        List<TypeDTO> types = typesService.findByCategoryId(categoryId);
        return ResponseEntity.status(HttpStatus.OK).body(types);
    }

    @PutMapping("/deleted/{id}")
    public ResponseEntity<?> restoreType(@PathVariable Long id) throws Exception {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(typesService.backupType(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
