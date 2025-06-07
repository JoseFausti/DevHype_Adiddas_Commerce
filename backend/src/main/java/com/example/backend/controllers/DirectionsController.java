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

import com.example.backend.dtos.DirectionsDTO;
import com.example.backend.models.entities.Directions;
import com.example.backend.services.DirectionsServiceImpl;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/directions")
public class DirectionsController extends BaseControllerImpl<Directions, DirectionsServiceImpl> {
    
    @Autowired
    private DirectionsServiceImpl directionsService;

    @GetMapping("/{id}")
    public ResponseEntity<DirectionsDTO> getDirectionById(@PathVariable Long id) throws Exception {
        DirectionsDTO directionsDTO = directionsService.getById(id);
        return ResponseEntity.ok(directionsDTO);
    }

    @GetMapping("/")
    public ResponseEntity<List<DirectionsDTO>> getAllDirections() throws Exception {
        List<DirectionsDTO> directionsDTOs = directionsService.getAll();
        return ResponseEntity.ok(directionsDTOs);
    }

    @PostMapping("/")
    public ResponseEntity<DirectionsDTO> createDirection(@RequestBody DirectionsDTO directionsDTO) throws Exception {
        DirectionsDTO createdDirection = directionsService.save(directionsDTO);
        return ResponseEntity.ok(createdDirection);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DirectionsDTO> updateDirection(@PathVariable Long id, @RequestBody DirectionsDTO directionsDTO) throws Exception {
        DirectionsDTO updatedDirection = directionsService.update(directionsDTO, id);
        return ResponseEntity.ok(updatedDirection);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(directionsService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

}
