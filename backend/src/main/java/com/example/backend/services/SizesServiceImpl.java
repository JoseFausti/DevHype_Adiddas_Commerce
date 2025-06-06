package com.example.backend.services;

import com.example.backend.models.entities.ProductVariants;
import com.example.backend.models.entities.Sizes;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ProductVariantsRepository;
import com.example.backend.repositories.SizesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizesServiceImpl extends BaseServiceImpl<Sizes, Long> implements SizesService {

    @Autowired
    private SizesRepository sizesRepository;

    @Autowired
    private ProductVariantsRepository productVariantsRepository;

    public SizesServiceImpl(BaseRepository<Sizes, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public List<Sizes> findAll() throws Exception {
        List<Sizes> sizes = super.findAll();
        for (Sizes size : sizes) {
            List<ProductVariants> variants = productVariantsRepository.findBySize(size);
            size.setProductVariants(variants);
        }
        return sizes;
    }

    @Override
    @Transactional
    public Sizes findById(Long id) throws Exception {
        Sizes size = super.findById(id);
        List<ProductVariants> variants = productVariantsRepository.findBySize(size);
        size.setProductVariants(variants);
        return size;
    }

    @Override
    @Transactional
    public Sizes save(Sizes size) throws Exception {
        try {
            if (sizesRepository.existsBySize(size.getSize())) {
                throw new Exception("Ya existe un talle con el valor: " + size.getSize());
            }
            Sizes saved = sizesRepository.save(size);
            saved.setProductVariants(productVariantsRepository.findBySize(saved));
            return saved;
        } catch (Exception e) {
            throw new Exception("Error al guardar talle: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Sizes update(Sizes size, Long id) throws Exception {
        try {
            Optional<Sizes> sizeOptional = sizesRepository.findById(id);
            if (!sizeOptional.isPresent()) {
                throw new Exception("Talle no encontrado con ID: " + id);
            }

            if (sizesRepository.existsBySizeAndIdNot(size.getSize(), id)) {
                throw new Exception("Ya existe otro talle con el valor: " + size.getSize());
            }

            size.setId(id);
            Sizes updated = sizesRepository.save(size);
            updated.setProductVariants(productVariantsRepository.findBySize(updated));
            return updated;
        } catch (Exception e) {
            throw new Exception("Error al actualizar talle: " + e.getMessage());
        }
    }
}
