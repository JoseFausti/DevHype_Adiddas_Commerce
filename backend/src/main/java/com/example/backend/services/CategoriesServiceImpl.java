package com.example.backend.services;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.category.CategoryDTO;
import com.example.backend.mappers.CategoryMapper;
import com.example.backend.models.entities.Categories;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.CategoriesRepository;

import java.util.Optional;

@Service
public class CategoriesServiceImpl extends BaseServiceImpl<Categories, Long> implements CategoriesService{

    @Autowired
    private CategoriesRepository categoriesRepository;

    public CategoriesServiceImpl(BaseRepository<Categories, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public CategoryDTO save(CategoryDTO categoryDTO) throws Exception {
        try {
            if (categoriesRepository.existsByName(categoryDTO.getName())) {
                throw new Exception("Ya existe una categoría con el nombre: " + categoryDTO.getName());
            }
            Categories category = CategoryMapper.toEntity(categoryDTO);
            category = categoriesRepository.save(category);
            return CategoryMapper.toDto(category);
        } catch (Exception e) {
            throw new Exception("Error al guardar categoría: " + e.getMessage());
        }
    }

    @Transactional
    public CategoryDTO update(CategoryDTO categoryDTO, Long id) throws Exception {
        try {
            Optional<Categories> categoryOptional = categoriesRepository.findById(id);
            if (!categoryOptional.isPresent()) {
                throw new Exception("Categoría no encontrada con ID: " + id);
            }

            if (categoriesRepository.existsByNameAndIdNot(categoryDTO.getName(), id)) {
                throw new Exception("Ya existe otra categoría con el nombre: " + categoryDTO.getName());
            }

            Categories category = CategoryMapper.toEntity(categoryDTO);
            category.setId(id); // Aseguramos que se actualice el correcto
            return CategoryMapper.toDto(categoriesRepository.save(category));
        } catch (Exception e) {
            throw new Exception("Error al actualizar categoría: " + e.getMessage());
        }
    }

    @Transactional
    public CategoryDTO getById(Long id) throws Exception {
        Categories category = super.findById(id);
        return CategoryMapper.toDto(category);
    }

    @Transactional
    public List<CategoryDTO> getAll() throws Exception {
        List<Categories> categories = super.findAll();
        return categories.stream().map(CategoryMapper::toDto).toList();
    }

    @Transactional
    public CategoryDTO findByName(String name) throws Exception {
        try {
            Categories category = categoriesRepository.findByName(name)
                .orElseThrow(() -> new Exception("Categoría no encontrada con nombre: " + name));
            return CategoryMapper.toDto(category);
        } catch (Exception e) {
            throw new Exception("Error al buscar categoría: " + e.getMessage());
        }
    }
}
