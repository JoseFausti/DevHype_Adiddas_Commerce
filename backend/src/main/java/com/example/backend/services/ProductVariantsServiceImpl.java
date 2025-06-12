package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.productVariants.CreateUpdateProductVariantDTO;
import com.example.backend.dtos.productVariants.ProductVariantDTO;
import com.example.backend.mappers.ProductVariantMapper;
import com.example.backend.models.entities.Colors;
import com.example.backend.models.entities.ProductVariants;
import com.example.backend.models.entities.Products;
import com.example.backend.models.entities.Sizes;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ColorsRepository;
import com.example.backend.repositories.ProductVariantsRepository;
import com.example.backend.repositories.ProductsRepository;
import com.example.backend.repositories.SizesRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductVariantsServiceImpl extends BaseServiceImpl<ProductVariants, Long> implements ProductVariantsService{

    @Autowired
    private ProductVariantsRepository productVariantsRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ColorsRepository colorsRepository;

    @Autowired
    private SizesRepository sizesRepository;


    public ProductVariantsServiceImpl(BaseRepository<ProductVariants, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public ProductVariantDTO getById(Long id) throws Exception {
        ProductVariants variant = super.findById(id);
        return ProductVariantMapper.toDto(variant);
    }

    @Transactional
    public List<ProductVariantDTO> getAll() throws Exception {
        List<ProductVariants> variants = super.findAll();
        return variants.stream().map(ProductVariantMapper::toDto).toList();
    }

    @Transactional
    public ProductVariantDTO save(CreateUpdateProductVariantDTO dto) throws Exception {
        ProductVariants variant = new ProductVariants();

        // Buscar o lanzar error si no se encuentra el producto por nombre
        Products product = productsRepository.findByName(dto.getProductName())
            .orElseThrow(() -> new Exception("Producto no encontrado: " + dto.getProductName()));
        variant.setProduct(product);

        // Buscar o crear el color por nombre
        Colors color = colorsRepository.findByName(dto.getColorName())
            .orElseThrow(() -> new Exception("Color no encontrado: " + dto.getColorName()));
        variant.setColor(color);

        // Buscar o crear el size por número
        Sizes size = sizesRepository.findBySize(dto.getSizeNumber())
            .orElseThrow(() -> new Exception("Talle no encontrado: " + dto.getSizeNumber()));
        variant.setSize(size);

        variant.setStock(dto.getStock());

        variant = super.save(variant);
        return ProductVariantMapper.toDto(variant);
    }

    @Transactional
    public ProductVariantDTO update(CreateUpdateProductVariantDTO dto, Long id) throws Exception {
        ProductVariants variant = super.findById(id);

        Products product = productsRepository.findByName(dto.getProductName())
            .orElseThrow(() -> new Exception("Producto no encontrado: " + dto.getProductName()));
        variant.setProduct(product);

        Colors color = colorsRepository.findByName(dto.getColorName())
            .orElseThrow(() -> new Exception("Color no encontrado: " + dto.getColorName()));
        variant.setColor(color);

        Sizes size = sizesRepository.findBySize(dto.getSizeNumber())
            .orElseThrow(() -> new Exception("Talle no encontrado: " + dto.getSizeNumber()));
        variant.setSize(size);

        variant.setStock(dto.getStock());

        variant = super.update(variant, id);
        return ProductVariantMapper.toDto(variant);
    }

}

