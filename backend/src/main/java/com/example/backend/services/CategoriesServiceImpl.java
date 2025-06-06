package com.example.backend.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.entities.Categories;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.CategoriesRepository;
import com.example.backend.repositories.ProductsRepository;
import com.example.backend.repositories.TypesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriesServiceImpl extends BaseServiceImpl<Categories, Long> implements CategoriesService {

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private TypesRepository typesRepository;

    public CategoriesServiceImpl(BaseRepository<Categories, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public Categories save(Categories category) throws Exception {
        try {
            if (categoriesRepository.existsByName(category.getName())) {
                throw new Exception("Ya existe una categoría con el nombre: " + category.getName());
            }
            Categories saved = categoriesRepository.save(category);

            // Cargar relaciones
            saved.setProducts(productsRepository.findByCategory(saved));
            saved.setTypes(typesRepository.findByCategory(saved));

            return saved;
        } catch (Exception e) {
            throw new Exception("Error al guardar categoría: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Categories update(Categories category, Long id) throws Exception {
        try {
            Optional<Categories> categoryOptional = categoriesRepository.findById(id);
            if (!categoryOptional.isPresent()) {
                throw new Exception("Categoría no encontrada con ID: " + id);
            }

            if (categoriesRepository.existsByNameAndIdNot(category.getName(), id)) {
                throw new Exception("Ya existe otra categoría con el nombre: " + category.getName());
            }

            category.setId(id);
            Categories updated = categoriesRepository.save(category);

            // Cargar relaciones
            updated.setProducts(productsRepository.findByCategory(updated));
            updated.setTypes(typesRepository.findByCategory(updated));

            return updated;
        } catch (Exception e) {
            throw new Exception("Error al actualizar categoría: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Categories findById(Long id) throws Exception {
        try {
            Categories category = categoriesRepository.findById(id)
                    .orElseThrow(() -> new Exception("Categoría no encontrada con ID: " + id));

            category.setProducts(productsRepository.findByCategory(category));
            category.setTypes(typesRepository.findByCategory(category));

            return category;
        } catch (Exception e) {
            throw new Exception("Error al obtener categoría: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public List<Categories> findAll() throws Exception {
        try {
            List<Categories> categories = categoriesRepository.findAll();
            for (Categories category : categories) {
                category.setProducts(productsRepository.findByCategory(category));
                category.setTypes(typesRepository.findByCategory(category));
            }
            return categories;
        } catch (Exception e) {
            throw new Exception("Error al obtener categorías: " + e.getMessage());
        }
    }
}
