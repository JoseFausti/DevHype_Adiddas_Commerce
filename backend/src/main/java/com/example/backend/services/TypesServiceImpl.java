package com.example.backend.services;

import com.example.backend.dtos.types.CreateTypeDTO;
import com.example.backend.dtos.types.TypeDTO;
import com.example.backend.mappers.TypeMapper;
import com.example.backend.models.entities.Types;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.CategoriesRepository;
import com.example.backend.repositories.TypesRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.backend.models.entities.Categories;



@Service
public class TypesServiceImpl extends BaseServiceImpl<Types, Long> implements TypesService {

    @Autowired
    private TypesRepository typesRepository;

    @Autowired
    private CategoriesRepository categoriesRepository;


    public TypesServiceImpl(BaseRepository<Types, Long> baseRepository) {
        super(baseRepository);
    }

  @Transactional
    public TypeDTO save(CreateTypeDTO dto) throws Exception {
        try {

            Types type = new Types();

            if (dto.getCategoryId() == null) {
                throw new Exception("La categoría es obligatoria");
            }

            if (typesRepository.existsByNameAndCategoryId(dto.getName(), dto.getCategoryId())) {
                throw new Exception("Ya existe un tipo con el nombre: " + dto.getName() + " en esta categoría.");
            }

            Categories category = categoriesRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new Exception("Categoría no encontrada con ID: " + dto.getCategoryId()));

            type.setName(dto.getName());
            type.setCategory(category);

            type = typesRepository.save(type);

            return TypeMapper.toDto(type);
        } catch (Exception e) {
            throw new Exception("Error al guardar tipo: " + e.getMessage());
        }
    }

    @Transactional
    public TypeDTO update(TypeDTO dto, Long id) throws Exception {
        try {

            Types type = typesRepository.findById(id)
                    .orElseThrow(() -> new Exception("Tipo no encontrado con ID: " + id));

            if (typesRepository.existsByNameAndCategoryIdAndIdNot(dto.getName(), dto.getCategoryId(), id)) {
                throw new Exception("Ya existe otro tipo con el nombre: " + dto.getName() + " en esta categoría.");
            }

            Categories category = categoriesRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new Exception("Categoría no encontrada con ID: " + dto.getCategoryId()));

            type.setName(dto.getName());
            type.setCategory(category);

            type = typesRepository.save(type);
            return TypeMapper.toDto(type);
        } catch (Exception e) {
            throw new Exception("Error al actualizar tipo: " + e.getMessage());
        }
    }

    @Transactional
    public TypeDTO getById(Long id) throws Exception {
        Types type = super.findById(id);
        return TypeMapper.toDto(type);
    }

    @Transactional
    public List<TypeDTO> getAll() throws Exception {
        List<Types> types = super.findAll()
            .stream()
            .filter(type -> !type.isDeleted())
            .toList()    
        ;
        return types.stream().map(TypeMapper::toDto).toList();
    }

    public List<TypeDTO> findByCategoryId(Long categoryId) throws Exception {
        try {
            List<Types> types = typesRepository.findAllByCategoryId(categoryId);
            return types.stream().map(TypeMapper::toDto).toList();
        } catch (Exception e) {
            throw new Exception("Error al obtener tipos por categoría: " + e.getMessage());
        }
    }
    
    @Transactional
    public TypeDTO backupType(Long id) throws Exception {
        Types type = super.findById(id);
        type.setDeleted(false);
        return TypeMapper.toDto(type);
    }

}