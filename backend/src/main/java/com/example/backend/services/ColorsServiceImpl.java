package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.ColorDTO;
import com.example.backend.mappers.ColorMapper;
import com.example.backend.models.entities.Colors;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ColorsRepository;

import jakarta.transaction.Transactional;

@Service
public class ColorsServiceImpl extends BaseServiceImpl<Colors, Long> implements ColorsService {
    
    @Autowired
    private ColorsRepository colorsRepository;
    
    public ColorsServiceImpl(BaseRepository<Colors, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public ColorDTO save(ColorDTO colorDTO) throws Exception {
        try {
            if (colorsRepository.existsByName(colorDTO.getName())) {
                throw new Exception("Ya existe un color con el nombre: " + colorDTO.getName());
            }
            Colors color = ColorMapper.toEntity(colorDTO);
            color = colorsRepository.save(color);
            return ColorMapper.toDto(color);
        } catch (Exception e) {
            throw new Exception("Error al guardar color: " + e.getMessage());
        }
    }

    @Transactional
    public ColorDTO update(ColorDTO colorDTO, Long id) throws Exception {
        try {
            Optional<Colors> colorOptional = colorsRepository.findById(id);
            if (!colorOptional.isPresent()) {
                throw new Exception("Color no encontrado con ID: " + id);
            }

            if (colorsRepository.existsByNameAndIdNot(colorDTO.getName(), id)) {
                throw new Exception("Ya existe otro color con el nombre: " + colorDTO.getName());
            }

            Colors color = ColorMapper.toEntity(colorDTO);
            color.setId(id); // Aseguramos que se actualice el correcto
            return ColorMapper.toDto(colorsRepository.save(color));
        } catch (Exception e) {
            throw new Exception("Error al actualizar color: " + e.getMessage());
        }
    }

    @Transactional
    public ColorDTO getById(Long id) throws Exception {
        Colors color = super.findById(id);
        return ColorMapper.toDto(color);
    }
    
    @Transactional
    public List<ColorDTO> getAll() throws Exception {
        List<Colors> colors = super.findAll();
        return colors.stream().map(ColorMapper::toDto).toList();
    }
}