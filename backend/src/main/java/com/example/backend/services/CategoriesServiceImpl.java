package com.example.backend.services;

import java.util.ArrayList;
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
import java.util.stream.Collectors;

import com.example.backend.dtos.category.CreateCategoryDTO;
import com.example.backend.dtos.types.CreateTypeDTO;
import com.example.backend.models.entities.Types;
import com.example.backend.repositories.TypesRepository;

@Service
public class CategoriesServiceImpl extends BaseServiceImpl<Categories, Long> implements CategoriesService{

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Autowired
    private TypesRepository typesRepository;

    public CategoriesServiceImpl(BaseRepository<Categories, Long> baseRepository) {
        super(baseRepository);
    }
    @Transactional
    public CategoryDTO save(CreateCategoryDTO categoryDTO) throws Exception {
        try {
            if (categoriesRepository.existsByName(categoryDTO.getName())) {
                throw new Exception("Ya existe una categoría con el nombre: " + categoryDTO.getName());
            }

            // 1. Crear la categoría vacía primero (sin tipos)
            Categories category = new Categories();
            category.setName(categoryDTO.getName());
            category.setDeleted(false);
            category.setTypes(new ArrayList<>());
            category = categoriesRepository.save(category);

            // 2. Crear los tipos y asociarlos a la categoría
            if (categoryDTO.getTypes() != null && !categoryDTO.getTypes().isEmpty()) {
                List<Types> types = new ArrayList<>();
                for (CreateTypeDTO typeDTO : categoryDTO.getTypes()) {
                    Types type = new Types();
                    type.setName(typeDTO.getName());
                    type.setCategory(category);
                    type.setDeleted(false);
                    types.add(type);
                }
                // Guardar todos los tipos
                typesRepository.saveAll(types);
                category.setTypes(types); // para que el CategoryDTO incluya los tipos
            }

            return CategoryMapper.toDto(category);
        } catch (Exception e) {
            throw new Exception("Error al guardar categoría: " + e.getMessage());
        }
    }

    @Transactional
    public CategoryDTO update(CategoryDTO categoryDTO, Long id) throws Exception {
        try {
            Categories category = categoriesRepository.findById(id)
                    .orElseThrow(() -> new Exception("Categoría no encontrada con ID: " + id));

            if (categoriesRepository.existsByNameAndIdNot(categoryDTO.getName(), id)) {
                throw new Exception("Ya existe otra categoría con el nombre: " + categoryDTO.getName());
            }

            // Actualizar datos básicos
            category.setName(categoryDTO.getName());

            // Limpiar tipos actuales con cuidado para evitar errores por orphanRemoval
            category.getTypes().forEach(t -> t.setCategory(null));
            category.getTypes().clear();

            // Setear los nuevos tipos
            if (categoryDTO.getTypes() != null) {
                categoryDTO.getTypes().forEach(typeDTO -> {
                    Types type = new Types();
                    type.setName(typeDTO.getName());
                    type.setCategory(category); // relación bidireccional
                    category.getTypes().add(type);
                });
            }

            // Hibernate detecta los cambios automáticamente al ser una entidad gestionada
            return CategoryMapper.toDto(category);
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
        return categories
            .stream()
            .filter(category -> !category.isDeleted())
            .map(category -> {
                // Creamos una copia para no romper la integridad de JPA con orphanRemoval al modificar el elemento original
                Categories filteredCategory = new Categories();
                filteredCategory.setId(category.getId());
                filteredCategory.setName(category.getName());
                filteredCategory.setDeleted(category.isDeleted());
                filteredCategory.setTypes(
                    category.getTypes()
                            .stream()
                            .filter(type -> !type.isDeleted())
                            .collect(Collectors.toList())
                );

                return CategoryMapper.toDto(filteredCategory);
            })
            .toList();
    }

    @Transactional
    public List<CategoryDTO> getAllWithOnlyDeletedTypes() throws Exception {
        List<Categories> categories = super.findAll(); 

        return categories
            .stream()
            .filter(category -> {
                // Filtramos solo categorías que tengan al menos un tipo eliminado
                return category.getTypes() != null &&
                    category.getTypes().stream().anyMatch(Types::isDeleted);
            })
            .map(category -> {
                // Creamos una nueva categoría con solo los tipos eliminados
                Categories filteredCategory = new Categories();
                filteredCategory.setId(category.getId());
                filteredCategory.setName(category.getName());
                filteredCategory.setDeleted(category.isDeleted());
                filteredCategory.setTypes(
                    category.getTypes()
                            .stream()
                            .filter(Types::isDeleted)
                            .collect(Collectors.toList())
                );

                return CategoryMapper.toDto(filteredCategory);
            })
            .toList();
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

    @Transactional
    public List<CategoryDTO> getAllTypesDeletedInCategory () throws Exception {
        
        List<Categories> categories = super.findAll(); 
        return categories
            .stream()
            .filter(category -> !category.isDeleted())
            .map(category -> {
                // Creamos una copia para no romper la integridad de JPA con orphanRemoval al modificar el elemento original
                Categories filteredCategory = new Categories();
                filteredCategory.setId(category.getId());
                filteredCategory.setName(category.getName());
                filteredCategory.setDeleted(category.isDeleted());
                filteredCategory.setTypes(
                    category.getTypes()
                            .stream()
                            .filter(type -> type.isDeleted())
                            .collect(Collectors.toList())
                );

                return CategoryMapper.toDto(filteredCategory);
            })
            .toList();
                    
    }
}
