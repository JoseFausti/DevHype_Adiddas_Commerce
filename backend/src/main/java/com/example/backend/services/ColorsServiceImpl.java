package com.example.backend.services;

import com.example.backend.models.entities.Colors;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ColorsRepository;
import com.example.backend.repositories.ProductVariantsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ColorsServiceImpl extends BaseServiceImpl<Colors, Long> implements ColorsService {

    @Autowired
    private ColorsRepository colorsRepository;

    @Autowired
    private ProductVariantsRepository productVariantsRepository;

    public ColorsServiceImpl(BaseRepository<Colors, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public Colors save(Colors color) throws Exception {
        try {
            if (colorsRepository.existsByName(color.getName())) {
                throw new Exception("Ya existe un color con el nombre: " + color.getName());
            }
            Colors saved = colorsRepository.save(color);
            saved.setProductVariants(productVariantsRepository.findByColor(saved));
            return saved;
        } catch (Exception e) {
            throw new Exception("Error al guardar color: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Colors update(Colors color, Long id) throws Exception {
        try {
            Optional<Colors> colorOptional = colorsRepository.findById(id);
            if (!colorOptional.isPresent()) {
                throw new Exception("Color no encontrado con ID: " + id);
            }

            if (colorsRepository.existsByNameAndIdNot(color.getName(), id)) {
                throw new Exception("Ya existe otro color con el nombre: " + color.getName());
            }

            color.setId(id);
            Colors updated = colorsRepository.save(color);
            updated.setProductVariants(productVariantsRepository.findByColor(updated));
            return updated;
        } catch (Exception e) {
            throw new Exception("Error al actualizar color: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Colors findById(Long id) throws Exception {
        try {
            Colors color = colorsRepository.findById(id)
                    .orElseThrow(() -> new Exception("Color no encontrado con ID: " + id));
            color.setProductVariants(productVariantsRepository.findByColor(color));
            return color;
        } catch (Exception e) {
            throw new Exception("Error al obtener color: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public List<Colors> findAll() throws Exception {
        try {
            List<Colors> colors = colorsRepository.findAll();
            for (Colors color : colors) {
                color.setProductVariants(productVariantsRepository.findByColor(color));
            }
            return colors;
        } catch (Exception e) {
            throw new Exception("Error al obtener colores: " + e.getMessage());
        }
    }
}
