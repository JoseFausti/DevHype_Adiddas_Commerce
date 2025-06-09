package com.example.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.DiscountDTO;
import com.example.backend.mappers.DiscountMapper;
import com.example.backend.models.entities.Discounts;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.DiscountsRepository;

import jakarta.transaction.Transactional;

@Service
public class DiscountsServiceImpl extends BaseServiceImpl<Discounts, Long> implements DiscountsService {

    @Autowired
    private DiscountsRepository discountsRepository;

    public DiscountsServiceImpl(BaseRepository<Discounts, Long> baseRepository) {
        super(baseRepository);
    }
    
    @Transactional
    public DiscountDTO getById(Long id) throws Exception {
        Discounts discount = super.findById(id);
        return DiscountMapper.toDto(discount);
    }

    @Transactional
    public List<DiscountDTO> getAll() throws Exception {
        List<Discounts> discounts = super.findAll();
        return discounts.stream().map(DiscountMapper::toDto).toList();
    }

    @Transactional
    public DiscountDTO save(DiscountDTO discountDTO) throws Exception {
        Discounts discount = DiscountMapper.toEntity(discountDTO);
        discount = super.save(discount);
        return DiscountMapper.toDto(discount);
    }

    @Transactional
    public DiscountDTO update(DiscountDTO discountDTO, Long id) throws Exception {
        Discounts discount = DiscountMapper.toEntity(discountDTO);
        discount = super.update(discount, id);
        return DiscountMapper.toDto(discount);
    }

}
