package com.example.backend.services;

import com.example.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.entities.Directions;
import com.example.backend.models.entities.Users;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.DirectionsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DirectionsServiceImpl extends BaseServiceImpl<Directions, Long> implements DirectionsService {

    @Autowired
    private DirectionsRepository directionsRepository;

    @Autowired
    private UserRepository userRepository;

    public DirectionsServiceImpl(BaseRepository<Directions, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public List<Directions> findAll() throws Exception {
        List<Directions> directions = super.findAll();
        for (Directions direction : directions) {
            List<Users> users = userRepository.findByDirections(direction);
            direction.setUsers(users);
        }
        return directions;
    }

    @Override
    @Transactional
    public Directions findById(Long id) throws Exception {
        Directions direction = super.findById(id);
        List<Users> users = userRepository.findByDirections(direction);
        direction.setUsers(users);
        return direction;
    }

    @Override
    @Transactional
    public Directions save(Directions direction) throws Exception {
        try {
            if (directionsRepository.existsByStreetAndNumberAndLocalityAndCityAndCountryAndPostalCode(
                    direction.getStreet(),
                    direction.getNumber(),
                    direction.getLocality(),
                    direction.getCity(),
                    direction.getCountry(),
                    direction.getPostalCode()
            )) {
                throw new Exception("Ya existe una dirección con esos datos.");
            }

            Directions saved = directionsRepository.save(direction);
            saved.setUsers(userRepository.findByDirections(saved));
            return saved;
        } catch (Exception e) {
            throw new Exception("Error al guardar dirección: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Directions update(Directions direction, Long id) throws Exception {
        try {
            Optional<Directions> directionOptional = directionsRepository.findById(id);
            if (!directionOptional.isPresent()) {
                throw new Exception("Dirección no encontrada con ID: " + id);
            }

            if (directionsRepository.existsByStreetAndNumberAndLocalityAndCityAndCountryAndPostalCodeAndIdNot(
                    direction.getStreet(),
                    direction.getNumber(),
                    direction.getLocality(),
                    direction.getCity(),
                    direction.getCountry(),
                    direction.getPostalCode(),
                    id
            )) {
                throw new Exception("Ya existe otra dirección con esos datos.");
            }

            direction.setId(id);
            Directions updated = directionsRepository.save(direction);
            updated.setUsers(userRepository.findByDirections(updated));
            return updated;
        } catch (Exception e) {
            throw new Exception("Error al actualizar dirección: " + e.getMessage());
        }
    }
}
