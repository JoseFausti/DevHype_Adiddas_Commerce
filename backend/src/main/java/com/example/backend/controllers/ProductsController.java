package com.example.backend.controllers;

import com.example.backend.dtos.products.ProductDTO;
import com.example.backend.services.ProductsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.backend.dtos.products.CreateUpdateProductDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductsServiceImpl productsService;

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) throws Exception {
        ProductDTO productDTO = productsService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(productDTO);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() throws Exception {
        List<ProductDTO> productDTOs = productsService.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(productDTOs);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody CreateUpdateProductDTO createDTO) throws Exception {
        ProductDTO createdProduct = productsService.save(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody CreateUpdateProductDTO updateDTO) throws Exception {
        ProductDTO updatedProduct = productsService.update(updateDTO, id);
        return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(productsService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/deleted")
    public ResponseEntity<?> getAllDeletedProducts() throws Exception {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productsService.getAllDeleted());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/deleted/{id}")
    public ResponseEntity<?> restoreProduct(@PathVariable Long id) throws Exception {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productsService.backupProduct(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    
}