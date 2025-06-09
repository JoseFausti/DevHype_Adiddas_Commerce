package com.example.backend.controllers;

import com.example.backend.dtos.SizeDTO;
import com.example.backend.services.SizesServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/sizes")
public class SizesController {

    @Autowired
    private SizesServiceImpl sizesService;

    @GetMapping("/{id}")
    public ResponseEntity<SizeDTO> getSize(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(sizesService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SizeDTO>> getAllSizes() throws Exception {
        return ResponseEntity.ok(sizesService.getAll());
    }

    @PostMapping
    public ResponseEntity<SizeDTO> createSize(@RequestBody SizeDTO sizeDTO) throws Exception {
        return ResponseEntity.ok(sizesService.save(sizeDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SizeDTO> updateSize(@PathVariable Long id, @RequestBody SizeDTO sizeDTO) throws Exception {
        return ResponseEntity.ok(sizesService.update(sizeDTO, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(sizesService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}