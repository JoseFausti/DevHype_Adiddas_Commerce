package com.example.backend.services;

import com.example.backend.models.entities.Types;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.TypesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TypesServiceImpl extends BaseServiceImpl<Types, Long> implements TypesService{

    @Autowired
    private TypesRepository typesRepository;

    public TypesServiceImpl(BaseRepository<Types, Long> baseRepository){
        super(baseRepository);
    }

    @Override
    @Transactional
    public Types save(Types type) throws Exception {
        try {
            if (typesRepository.existsByName(type.getName())) {
                throw new Exception("Ya existe un tipo con el nombre: " + type.getName());
            }
            type = typesRepository.save(type);
            return type;
        } catch (Exception e) {
            throw new Exception("Error al guardar tipo: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Types update(Types type, Long id) throws Exception {
        try {
            Optional<Types> typeOptional = typesRepository.findById(id);
            if (!typeOptional.isPresent()) {
                throw new Exception("Tipo no encontrado con ID: " + id);
            }

            if (typesRepository.existsByNameAndIdNot(type.getName(), id)) {
                throw new Exception("Ya existe otro tipo con el nombre: " + type.getName());
            }

            type.setId(id);
            return typesRepository.save(type);
        } catch (Exception e) {
            throw new Exception("Error al actualizar tipo: " + e.getMessage());
        }
    }
}
