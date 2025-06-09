package com.example.backend.controllers;

import com.example.backend.dtos.productVariants.CreateUpdateProductVariantDTO;
import com.example.backend.dtos.productVariants.ProductVariantDTO;
import com.example.backend.services.ProductVariantsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/product-variants")
public class ProductVariantsController {

    @Autowired
    private ProductVariantsServiceImpl productVariantsService;

    @GetMapping("/{id}")
    public ResponseEntity<ProductVariantDTO> getProductVariant(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(productVariantsService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProductVariantDTO>> getAllProductVariants() throws Exception {
        return ResponseEntity.ok(productVariantsService.getAll());
    }

    @PostMapping
    public ResponseEntity<ProductVariantDTO> createProductVariant(@RequestBody CreateUpdateProductVariantDTO  variantDTO) throws Exception {
        return ResponseEntity.ok(productVariantsService.save(variantDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductVariantDTO> updateProductVariant(@PathVariable Long id, @RequestBody CreateUpdateProductVariantDTO  variantDTO) throws Exception {
        return ResponseEntity.ok(productVariantsService.update(variantDTO, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(productVariantsService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}