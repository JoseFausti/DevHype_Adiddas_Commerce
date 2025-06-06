package com.example.backend.services;

import com.example.backend.models.entities.Discounts;
import com.example.backend.models.entities.Products;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.DiscountsRepository;
import com.example.backend.repositories.ProductsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscountsServiceImpl extends BaseServiceImpl<Discounts, Long> implements DiscountsService {

    @Autowired
    private DiscountsRepository discountsRepository;

    @Autowired
    private ProductsRepository productsRepository;

    public DiscountsServiceImpl(BaseRepository<Discounts, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public List<Discounts> findAll() throws Exception {
        List<Discounts> discounts = super.findAll();
        for (Discounts discount : discounts) {
            List<Products> products = productsRepository.findByDiscounts(discount);
            discount.setProducts(products);
        }
        return discounts;
    }

    @Override
    @Transactional
    public Discounts findById(Long id) throws Exception {
        Discounts discount = super.findById(id);
        List<Products> products = productsRepository.findByDiscounts(discount);
        discount.setProducts(products);
        return discount;
    }

    @Override
    @Transactional
    public Discounts save(Discounts discount) throws Exception {
        try {
            Discounts saved = discountsRepository.save(discount);
            saved.setProducts(productsRepository.findByDiscounts(saved));
            return saved;
        } catch (Exception e) {
            throw new Exception("Error al guardar descuento: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Discounts update(Discounts discount, Long id) throws Exception {
        try {
            Optional<Discounts> discountOptional = discountsRepository.findById(id);
            if (!discountOptional.isPresent()) {
                throw new Exception("Descuento no encontrado con ID: " + id);
            }

            discount.setId(id);
            Discounts updated = discountsRepository.save(discount);
            updated.setProducts(productsRepository.findByDiscounts(updated));
            return updated;
        } catch (Exception e) {
            throw new Exception("Error al actualizar descuento: " + e.getMessage());
        }
    }
}
