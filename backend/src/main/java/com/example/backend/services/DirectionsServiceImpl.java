package com.example.backend.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.DirectionsDTO;
import com.example.backend.mappers.DirectionsMapper;
import com.example.backend.models.entities.Directions;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.DirectionsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DirectionsServiceImpl extends BaseServiceImpl<Directions, Long> implements DirectionsService {

    @Autowired
    private DirectionsRepository directionsRepository;

    public DirectionsServiceImpl(BaseRepository<Directions, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public DirectionsDTO save(DirectionsDTO directionsDTO) throws Exception {
        try {
            if (directionsRepository.existsByStreetAndNumberAndLocalityAndCityAndCountryAndPostalCode(
                    directionsDTO.getStreet(),
                    directionsDTO.getNumber(),
                    directionsDTO.getLocality(),
                    directionsDTO.getCity(),
                    directionsDTO.getCountry(),
                    directionsDTO.getPostalCode()
            )) {
                throw new Exception("Ya existe una dirección con esos datos.");
            }

            Directions direction = DirectionsMapper.toEntity(directionsDTO);
            direction = directionsRepository.save(direction);
            return DirectionsMapper.toDto(direction);
        } catch (Exception e) {
            throw new Exception("Error al guardar dirección: " + e.getMessage());
        }
    }

    @Transactional
    public DirectionsDTO update(DirectionsDTO directionsDTO, Long id) throws Exception {
        try {
            Optional<Directions> directionOptional = directionsRepository.findById(id);
            if (!directionOptional.isPresent()) {
                throw new Exception("Dirección no encontrada con ID: " + id);
            }

            if (directionsRepository.existsByStreetAndNumberAndLocalityAndCityAndCountryAndPostalCodeAndIdNot(
                    directionsDTO.getStreet(),
                    directionsDTO.getNumber(),
                    directionsDTO.getLocality(),
                    directionsDTO.getCity(),
                    directionsDTO.getCountry(),
                    directionsDTO.getPostalCode(),
                    id
            )) {
                throw new Exception("Ya existe otra dirección con esos datos.");
            }

            Directions direction = DirectionsMapper.toEntity(directionsDTO);
            direction.setId(id);
            direction = directionsRepository.save(direction);
            return DirectionsMapper.toDto(direction);
        } catch (Exception e) {
            throw new Exception("Error al actualizar dirección: " + e.getMessage());
        }
    }

    @Transactional
    public DirectionsDTO getById(Long id) throws Exception {
        Directions direction = super.findById(id);
        return DirectionsMapper.toDto(direction);
    }

    @Transactional
    public List<DirectionsDTO> getAll() throws Exception {
        List<Directions> directions = super.findAll();
        return directions.stream().map(DirectionsMapper::toDto).toList();
    }
}