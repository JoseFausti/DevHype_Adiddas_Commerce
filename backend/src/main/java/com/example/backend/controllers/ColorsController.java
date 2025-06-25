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

import com.example.backend.dtos.ColorDTO;
import com.example.backend.services.ColorsServiceImpl;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/colors")
public class ColorsController {

    @Autowired
    private ColorsServiceImpl colorsService;

    @GetMapping("/{id}")
    public ResponseEntity<ColorDTO> getColor(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(colorsService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ColorDTO>> getAllColors() throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(colorsService.getAll());
    }

    @PostMapping
    public ResponseEntity<ColorDTO> createColor(@RequestBody ColorDTO colorDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(colorsService.save(colorDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ColorDTO> updateColor(@PathVariable Long id, @RequestBody ColorDTO colorDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(colorsService.update(colorDTO, id));
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