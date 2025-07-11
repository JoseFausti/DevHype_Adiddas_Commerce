package com.example.backend.controllers;

import java.util.List;

import com.example.backend.models.entities.Purchase_orders;
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


    private Purchase_orders purchaseOrders;

    @GetMapping("/{id}")
    public ResponseEntity<DetailDTO> getDetailById(@PathVariable Long id) throws Exception {
        DetailDTO detailDTO = detailService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(detailDTO);
    }

    @GetMapping
    public ResponseEntity<List<DetailDTO>> getAllDetails() throws Exception {
        List<DetailDTO> detailDTOs = detailService.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(detailDTOs);
    }

    @PostMapping
    public ResponseEntity<DetailDTO> createDetail(@RequestBody CreateUpdateDetailDTO dto) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(detailService.save(dto , purchaseOrders));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetailDTO> updateDetail(@PathVariable Long id, @RequestBody CreateUpdateDetailDTO dto) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(detailService.update(dto, id));
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