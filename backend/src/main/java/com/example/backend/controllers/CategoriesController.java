package com.example.backend.controllers;

import com.example.backend.dtos.category.CategoryDTO;
import com.example.backend.services.CategoriesServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.backend.dtos.category.CreateCategoryDTO;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categories")
public class CategoriesController {

    @Autowired
    private CategoriesServiceImpl categoriesService;

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(categoriesService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(categoriesService.getAll());
    }

    @GetMapping("/deletedTypes")
    public ResponseEntity<List<CategoryDTO>> getAllWithDeletedTypes() throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(categoriesService.getAllWithOnlyDeletedTypes());
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CreateCategoryDTO categoryDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriesService.save(categoryDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(categoriesService.update(categoryDTO, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(categoriesService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping("/name/{name}")
    public ResponseEntity<CategoryDTO> getCategoryByName(@PathVariable String name) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(categoriesService.findByName(name));
    }

    @GetMapping("/deleted")
    public ResponseEntity<?> getAllTypesDeletedInCategories() throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(categoriesService.getAllTypesDeletedInCategory());
    }
}