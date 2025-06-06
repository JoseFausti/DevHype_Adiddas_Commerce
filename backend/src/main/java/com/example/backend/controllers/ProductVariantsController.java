package com.example.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.entities.ProductVariants;
import com.example.backend.services.ProductVariantsServiceImpl;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/product_variants")
public class ProductVariantsController extends BaseControllerImpl<ProductVariants, ProductVariantsServiceImpl> {
    
}
