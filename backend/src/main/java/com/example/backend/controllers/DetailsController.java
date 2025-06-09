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

import com.example.backend.dtos.detail.CreateUpdateDetailDTO;
import com.example.backend.dtos.detail.DetailDTO;
import com.example.backend.services.DetailsServiceImpl;

@RestController
@CrossOrigin("*")
@RequestMapping("/details")
public class DetailsController {
    
    @Autowired
    private DetailsServiceImpl detailService;

    @GetMapping("/{id}")
    public ResponseEntity<DetailDTO> getDetailById(@PathVariable Long id) throws Exception {
        DetailDTO detailDTO = detailService.getById(id);
        return ResponseEntity.ok(detailDTO);
    }

    @GetMapping
    public ResponseEntity<List<DetailDTO>> getAllDetails() throws Exception {
        List<DetailDTO> detailDTOs = detailService.getAll();
        return ResponseEntity.ok(detailDTOs);
    }

    @PostMapping
    public ResponseEntity<DetailDTO> createDetail(@RequestBody CreateUpdateDetailDTO dto) throws Exception {
        return ResponseEntity.ok(detailService.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetailDTO> updateDetail(@PathVariable Long id, @RequestBody CreateUpdateDetailDTO dto) throws Exception {
        return ResponseEntity.ok(detailService.update(dto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(detailService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

}
