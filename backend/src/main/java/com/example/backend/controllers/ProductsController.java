package com.example.backend.controllers;

import com.example.backend.dtos.products.ProductDTO;
import com.example.backend.services.ProductsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.backend.dtos.products.CreateUpdateProductDTO;

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

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Deletes a product specified by the given ID.
 *
 * @param id the ID of the product to be deleted
 * @return a ResponseEntity with HTTP status NO_CONTENT if the deletion is successful,
 *         or BAD_REQUEST with an error message if an exception occurs
 */

/*******  80548ca4-f0fe-41cf-a354-19fc50e23854  *******/
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(productsService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}