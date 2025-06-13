package com.example.backend.controllers;

import com.example.backend.dtos.DiscountDTO;
import com.example.backend.services.DiscountsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/discounts")
public class DiscountsController {

    @Autowired
    private DiscountsServiceImpl discountsService;

    @GetMapping("/{id}")
    public ResponseEntity<DiscountDTO> getDiscountById(@PathVariable Long id) throws Exception {
        DiscountDTO discountDTO = discountsService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(discountDTO);
    }

    @GetMapping
    public ResponseEntity<List<DiscountDTO>> getAllDiscounts() throws Exception {
        List<DiscountDTO> discountDTOs = discountsService.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(discountDTOs);
    }

    @PostMapping
    public ResponseEntity<DiscountDTO> createDiscount(@RequestBody DiscountDTO discountDTO) throws Exception {
        DiscountDTO createdDiscount = discountsService.save(discountDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDiscount);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiscountDTO> updateDiscount(@PathVariable Long id, @RequestBody DiscountDTO discountDTO) throws Exception {
        DiscountDTO updatedDiscount = discountsService.update(discountDTO, id);
        return ResponseEntity.status(HttpStatus.OK).body(updatedDiscount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(discountsService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}