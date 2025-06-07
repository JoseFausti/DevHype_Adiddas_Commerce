package com.example.backend.services;

import java.util.List;

import com.example.backend.dtos.SizeDTO;
import com.example.backend.mappers.SizeMapper;
import com.example.backend.models.entities.Sizes;
import com.example.backend.models.entities.Users;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.SizesRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SizesServiceImpl extends BaseServiceImpl<Sizes, Long> implements SizesService{
    @Autowired
    private SizesRepository sizesRepository;

    public SizesServiceImpl(BaseRepository<Sizes, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public SizeDTO save(SizeDTO sizeDTO) throws Exception {
        try {
            if (sizesRepository.existsBySize(sizeDTO.getSize())) {
                throw new Exception("Ya existe un talle con el valor: " + sizeDTO.getSize());
            }
            Sizes size = SizeMapper.toEntity(sizeDTO);
            size = sizesRepository.save(size);
            return SizeMapper.toDto(size);
        } catch (Exception e) {
            throw new Exception("Error al guardar talle: " + e.getMessage());
        }
    }

    @Transactional
    public SizeDTO update(SizeDTO sizeDTO, Long id) throws Exception {
        try {
            Optional<Sizes> sizeOptional = sizesRepository.findById(id);
            if (!sizeOptional.isPresent()) {
                throw new Exception("Talle no encontrado con ID: " + id);
            }

            if (sizesRepository.existsBySizeAndIdNot(sizeDTO.getSize(), id)) {
                throw new Exception("Ya existe otro talle con el valor: " + sizeDTO.getSize());
            }

            Sizes size = SizeMapper.toEntity(sizeDTO);
            size.setId(id);
            return SizeMapper.toDto(sizesRepository.save(size));
        } catch (Exception e) {
            throw new Exception("Error al actualizar talle: " + e.getMessage());
        }
    }

    @Transactional
    public SizeDTO getById(Long id) throws Exception {
        Sizes size = super.findById(id);
        return SizeMapper.toDto(size);
    }

    @Transactional
    public List<SizeDTO> getAll() throws Exception {
        List<Sizes> sizes = super.findAll();
        return sizes.stream().map(SizeMapper::toDto).toList();
    }

}
