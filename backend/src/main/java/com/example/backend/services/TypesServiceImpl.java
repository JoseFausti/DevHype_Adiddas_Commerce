package com.example.backend.services;

import com.example.backend.dtos.TypeDTO;
import com.example.backend.mappers.TypeMapper;
import com.example.backend.models.entities.Types;
import com.example.backend.repositories.BaseRepository;
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

    public TypesServiceImpl(BaseRepository<Types, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public TypeDTO save(TypeDTO typesDTO) throws Exception {
        try {
            if (typesRepository.existsByName(typesDTO.getName())) {
                throw new Exception("Ya existe un tipo con el nombre: " + typesDTO.getName());
            }

            Types type = TypeMapper.toEntity(typesDTO);
            type = typesRepository.save(type);
            return TypeMapper.toDto(type);
        } catch (Exception e) {
            throw new Exception("Error al guardar tipo: " + e.getMessage());
        }
    }

    @Transactional
    public TypeDTO update(TypeDTO typesDTO, Long id) throws Exception {
        try {
            Optional<Types> typeOptional = typesRepository.findById(id);
            if (!typeOptional.isPresent()) {
                throw new Exception("Tipo no encontrado con ID: " + id);
            }

            if (typesRepository.existsByNameAndIdNot(typesDTO.getName(), id)) {
                throw new Exception("Ya existe otro tipo con el nombre: " + typesDTO.getName());
            }

            Types type = TypeMapper.toEntity(typesDTO);
            type.setId(id);
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