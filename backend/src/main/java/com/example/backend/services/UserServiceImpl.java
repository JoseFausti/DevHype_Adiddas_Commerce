package com.example.backend.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.entities.Directions;
import com.example.backend.models.entities.Purchase_orders;
import com.example.backend.models.entities.Users;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.DirectionsRepository;
import com.example.backend.repositories.Purchase_ordersRepository;
import com.example.backend.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl extends BaseServiceImpl<Users, Long> implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DirectionsRepository directionsRepository;

    @Autowired
    private Purchase_ordersRepository purchaseOrdersRepository;

    public UserServiceImpl(BaseRepository<Users, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public List<Users> findAll() throws Exception {
        List<Users> users = super.findAll();
        for (Users user : users) {
            user.setDirections(directionsRepository.findByUsers(user));
            user.setPurchaseOrders(purchaseOrdersRepository.findByUser(user));
        }
        return users;
    }

    @Override
    @Transactional
    public Users findById(Long id) throws Exception {
        Users user = super.findById(id);
        user.setDirections(directionsRepository.findByUsers(user));
        user.setPurchaseOrders(purchaseOrdersRepository.findByUser(user));
        return user;
    }

    @Override
    @Transactional
    public Users save(Users user) throws Exception {
        try {
            if (userRepository.existsByUsername(user.getUsername())) {
                throw new Exception("Ya existe un usuario con el username: " + user.getUsername());
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new Exception("Ya existe un usuario con el email: " + user.getEmail());
            }

            user = userRepository.save(user);
            user.setDirections(directionsRepository.findByUsers(user));
            user.setPurchaseOrders(purchaseOrdersRepository.findByUser(user));
            return user;

        } catch (Exception e) {
            throw new Exception("Error al guardar usuario: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Users update(Users user, Long id) throws Exception {
        try {
            Optional<Users> userOptional = userRepository.findById(id);
            if (!userOptional.isPresent()) {
                throw new Exception("Usuario no encontrado con ID: " + id);
            }

            if (userRepository.existsByUsernameAndIdNot(user.getUsername(), id)) {
                throw new Exception("Ya existe otro usuario con el username: " + user.getUsername());
            }

            if (userRepository.existsByEmailAndIdNot(user.getEmail(), id)) {
                throw new Exception("Ya existe otro usuario con el email: " + user.getEmail());
            }

            user.setId(id);
            Users updatedUser = userRepository.save(user);
            updatedUser.setDirections(directionsRepository.findByUsers(updatedUser));
            updatedUser.setPurchaseOrders(purchaseOrdersRepository.findByUser(updatedUser));
            return updatedUser;

        } catch (Exception e) {
            throw new Exception("Error al actualizar usuario: " + e.getMessage());
        }
    }
}
