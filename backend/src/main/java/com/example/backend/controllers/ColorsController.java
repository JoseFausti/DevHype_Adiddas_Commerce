package com.example.backend.controllers;

import com.example.backend.dtos.ColorDTO;
import com.example.backend.services.ColorsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/colors")
public class ColorsController {

    @Autowired
    private ColorsServiceImpl colorsService;

    @GetMapping("/{id}")
    public ResponseEntity<ColorDTO> getColor(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(colorsService.getById(id));
    }

    @GetMapping("/")
    public ResponseEntity<List<ColorDTO>> getAllColors() throws Exception {
        return ResponseEntity.ok(colorsService.getAll());
    }

    @PostMapping("/")
    public ResponseEntity<ColorDTO> createColor(@RequestBody ColorDTO colorDTO) throws Exception {
        return ResponseEntity.ok(colorsService.save(colorDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ColorDTO> updateColor(@PathVariable Long id, @RequestBody ColorDTO colorDTO) throws Exception {
        return ResponseEntity.ok(colorsService.update(colorDTO, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(colorsService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}