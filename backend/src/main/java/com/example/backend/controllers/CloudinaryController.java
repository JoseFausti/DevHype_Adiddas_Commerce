package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.services.CloudinaryService;

@RestController
@CrossOrigin("*")
@RequestMapping("/image")
public class CloudinaryController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam MultipartFile file) {
        try {
            String url = cloudinaryService.uploadImage(file);
            return ResponseEntity.ok().body(url);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al subir imagen: " + e.getMessage());
        }
    }
}

