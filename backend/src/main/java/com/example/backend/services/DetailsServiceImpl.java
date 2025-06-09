package com.example.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.detail.CreateUpdateDetailDTO;
import com.example.backend.dtos.detail.DetailDTO;
import com.example.backend.mappers.DetailMapper;
import com.example.backend.models.entities.Details;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.DetailsRepository;

import jakarta.transaction.Transactional;

@Service
public class DetailsServiceImpl extends BaseServiceImpl<Details, Long> implements DetailsService {
    
    @Autowired
    private DetailsRepository detailsRepository;

    @Autowired
    private ProductVariantsServiceImpl productVariantsService;

    @Autowired
    @Lazy // Lazy loading to avoid circular dependency issues
    private Purchase_ordersServiceImpl purchaseOrdersService;


    public DetailsServiceImpl(BaseRepository<Details, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public DetailDTO save(CreateUpdateDetailDTO dto) throws Exception {
        try {
            Details detail = new Details();
            detail.setQuantity(dto.getQuantity());
            detail.setVariant(productVariantsService.findById(dto.getVariantId()));

            if (dto.getPurchaseOrderId() != null) {
                detail.setPurchaseOrder(purchaseOrdersService.findById(dto.getPurchaseOrderId()));
            }

            detail = detailsRepository.save(detail);
            return DetailMapper.toDto(detail);
        } catch (Exception e) {
            throw new Exception("Error al guardar el detalle: " + e.getMessage());
        }
    }

    @Transactional
    public DetailDTO update(CreateUpdateDetailDTO dto, Long id) throws Exception {
        try {
            Details detail = detailsRepository.findById(id)
                .orElseThrow(() -> new Exception("Detalle no encontrado con ID: " + id));

            detail.setQuantity(dto.getQuantity());
            detail.setVariant(productVariantsService.findById(dto.getVariantId()));

            if (dto.getPurchaseOrderId() != null) {
                detail.setPurchaseOrder(purchaseOrdersService.findById(dto.getPurchaseOrderId()));
            }

            detail = detailsRepository.save(detail);
            return DetailMapper.toDto(detail);
        } catch (Exception e) {
            throw new Exception("Error al actualizar el detalle: " + e.getMessage());
        }
    }


    @Transactional
    public DetailDTO getById(Long id) throws Exception {
        Details detail = super.findById(id);
        return DetailMapper.toDto(detail);
    }

    @Transactional
    public List<DetailDTO> getAll() throws Exception {
        List<Details> details = super.findAll();
        return details.stream().map(DetailMapper::toDto).toList();
    }

}
