package com.example.backend.services;

import com.example.backend.dtos.types.CreateUpdateTypeDTO;
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
    public TypeDTO save(CreateUpdateTypeDTO dto) throws Exception {
        try {
            if (typesRepository.existsByName(dto.getName())) {
                throw new Exception("Ya existe un tipo con el nombre: " + dto.getName());
            }

            var category = categoriesRepository.findByName(dto.getCategoryName())
                    .orElseThrow(() -> new Exception("Categoría no encontrada con nombre: " + dto.getCategoryName()));

            Types type = Types.builder()
                    .name(dto.getName())
                    .category(category)
                    .build();

            type = typesRepository.save(type);
            return TypeMapper.toDto(type);
        } catch (Exception e) {
            throw new Exception("Error al guardar tipo: " + e.getMessage());
        }
    }

    @Transactional
    public TypeDTO update(CreateUpdateTypeDTO dto, Long id) throws Exception {
        try {
            Types type = typesRepository.findById(id)
                    .orElseThrow(() -> new Exception("Tipo no encontrado con ID: " + id));

            if (typesRepository.existsByNameAndIdNot(dto.getName(), id)) {
                throw new Exception("Ya existe otro tipo con el nombre: " + dto.getName());
            }

            var category = categoriesRepository.findByName(dto.getCategoryName())
                    .orElseThrow(() -> new Exception("Categoría no encontrada con nombre: " + dto.getCategoryName()));

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
        List<Types> types = super.findAll();
        return types.stream().map(TypeMapper::toDto).toList();
    }
}