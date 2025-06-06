package com.example.backend.services;

import com.example.backend.models.entities.ProductVariants;
import com.example.backend.models.entities.Products;
import com.example.backend.models.entities.Colors;
import com.example.backend.models.entities.Sizes;
import com.example.backend.models.entities.Details;

import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ProductVariantsRepository;
import com.example.backend.repositories.ProductsRepository;
import com.example.backend.repositories.ColorsRepository;
import com.example.backend.repositories.SizesRepository;
import com.example.backend.repositories.DetailsRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductVariantsServiceImpl extends BaseServiceImpl<ProductVariants, Long> implements ProductVariantsService {

    @Autowired
    private ProductVariantsRepository productVariantsRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ColorsRepository colorsRepository;

    @Autowired
    private SizesRepository sizesRepository;

    @Autowired
    private DetailsRepository detailsRepository;

    public ProductVariantsServiceImpl(BaseRepository<ProductVariants, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public List<ProductVariants> findAll() throws Exception {
        List<ProductVariants> variants = super.findAll();
        for (ProductVariants variant : variants) {
            if (variant.getProduct() != null) {
                Products product = productsRepository.findById(variant.getProduct().getId())
                        .orElse(null);
                variant.setProduct(product);
            }
            if (variant.getColor() != null) {
                Colors color = colorsRepository.findById(variant.getColor().getId())
                        .orElse(null);
                variant.setColor(color);
            }
            if (variant.getSize() != null) {
                Sizes size = sizesRepository.findById(variant.getSize().getId())
                        .orElse(null);
                variant.setSize(size);
            }
            List<Details> details = detailsRepository.findByVariant(variant);
            variant.setDetails(details);
        }
        return variants;
    }

    @Override
    @Transactional
    public ProductVariants findById(Long id) throws Exception {
        ProductVariants variant = super.findById(id);
        if (variant.getProduct() != null) {
            Products product = productsRepository.findById(variant.getProduct().getId())
                    .orElse(null);
            variant.setProduct(product);
        }
        if (variant.getColor() != null) {
            Colors color = colorsRepository.findById(variant.getColor().getId())
                    .orElse(null);
            variant.setColor(color);
        }
        if (variant.getSize() != null) {
            Sizes size = sizesRepository.findById(variant.getSize().getId())
                    .orElse(null);
            variant.setSize(size);
        }
        List<Details> details = detailsRepository.findByVariant(variant);
        variant.setDetails(details);
        return variant;
    }

    @Override
    @Transactional
    public ProductVariants save(ProductVariants variant) throws Exception {
        try {
            ProductVariants saved = productVariantsRepository.save(variant);

            if (saved.getProduct() != null) {
                Products product = productsRepository.findById(saved.getProduct().getId())
                        .orElse(null);
                saved.setProduct(product);
            }
            if (saved.getColor() != null) {
                Colors color = colorsRepository.findById(saved.getColor().getId())
                        .orElse(null);
                saved.setColor(color);
            }
            if (saved.getSize() != null) {
                Sizes size = sizesRepository.findById(saved.getSize().getId())
                        .orElse(null);
                saved.setSize(size);
            }
            List<Details> details = detailsRepository.findByVariant(saved);
            saved.setDetails(details);

            return saved;
        } catch (Exception e) {
            throw new Exception("Error al guardar variante: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public ProductVariants update(ProductVariants variant, Long id) throws Exception {
        try {
            Optional<ProductVariants> variantOptional = productVariantsRepository.findById(id);
            if (!variantOptional.isPresent()) {
                throw new Exception("Variante no encontrada con ID: " + id);
            }
            variant.setId(id);
            ProductVariants updated = productVariantsRepository.save(variant);

            if (updated.getProduct() != null) {
                Products product = productsRepository.findById(updated.getProduct().getId())
                        .orElse(null);
                updated.setProduct(product);
            }
            if (updated.getColor() != null) {
                Colors color = colorsRepository.findById(updated.getColor().getId())
                        .orElse(null);
                updated.setColor(color);
            }
            if (updated.getSize() != null) {
                Sizes size = sizesRepository.findById(updated.getSize().getId())
                        .orElse(null);
                updated.setSize(size);
            }
            List<Details> details = detailsRepository.findByVariant(updated);
            updated.setDetails(details);

            return updated;
        } catch (Exception e) {
            throw new Exception("Error al actualizar variante: " + e.getMessage());
        }
    }
}
