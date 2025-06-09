package com.example.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.ProductDTO;
import com.example.backend.mappers.ProductMapper;
import com.example.backend.models.entities.Products;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ProductsRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductsServiceImpl extends BaseServiceImpl<Products, Long> implements ProductsService {
    
    @Autowired
    private ProductsRepository productsRepository;

    public ProductsServiceImpl(BaseRepository<Products, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public ProductDTO getById(Long id) throws Exception {
        Products product = super.findById(id); 
        return ProductMapper.toDto(product);
    }

    @Transactional
    public List<ProductDTO> getAll() throws Exception {
        List<Products> products = super.findAll();
        return products.stream().map(ProductMapper::toDto).toList();
    }

    @Transactional
    public ProductDTO save(ProductDTO productDTO) throws Exception {
        Products product = ProductMapper.toEntity(productDTO);
        product = super.save(product);
        return ProductMapper.toDto(product);
    }

    @Transactional
    public ProductDTO update(ProductDTO productDTO, Long id) throws Exception {
        Products product = ProductMapper.toEntity(productDTO);
        product = super.update(product, id);
        return ProductMapper.toDto(product);
    }

}
