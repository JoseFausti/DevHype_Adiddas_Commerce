package com.example.backend.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.backend.models.enums.PaymentMethod;
import com.example.backend.models.enums.Status;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.payment.Payment;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.detail.CreateUpdateDetailDTO;
import com.example.backend.dtos.detail.DetailDTO;
import com.example.backend.dtos.purchaseOrder.CreateUpdatePurchaseOrderDTO;
import com.example.backend.dtos.purchaseOrder.PurchaseOrderDTO;
import com.example.backend.mappers.PurchaseOrderMapper;
import com.example.backend.models.entities.Products;
import com.example.backend.models.entities.Purchase_orders;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.ProductsRepository;
import com.example.backend.repositories.Purchase_ordersRepository;

@Service
public class Purchase_ordersServiceImpl extends BaseServiceImpl<Purchase_orders, Long>
        implements Purchase_ordersService {

    @Autowired
    private Purchase_ordersRepository purchase_ordersRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private UserService usersService;

    @Autowired
    @Lazy // para evitar un ciclo de dependencia
    private DetailsServiceImpl detailsService;

    public Purchase_ordersServiceImpl(BaseRepository<Purchase_orders, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public PurchaseOrderDTO save(CreateUpdatePurchaseOrderDTO dto) throws Exception {
        try {
            Purchase_orders purchaseOrder = new Purchase_orders();
            purchaseOrder.setDate(LocalDate.now());
            purchaseOrder.setPaymentMethod(PaymentMethod.MERCADO_PAGO);
            purchaseOrder.setUser(usersService.findById(dto.getUserId()));
            purchaseOrder.setStatus(dto.getStatus() != null ? dto.getStatus() : Status.PENDING);

            purchaseOrder = purchase_ordersRepository.save(purchaseOrder);

            double totalPrice = 0.0;

            if (dto.getDetails() != null && !dto.getDetails().isEmpty()) {
                for (CreateUpdateDetailDTO detailDTO : dto.getDetails()) {
                    detailDTO.setPurchaseOrderId(purchaseOrder.getId());
                    DetailDTO savedDetail = detailsService.save(detailDTO);

                    int quantity = savedDetail.getQuantity();
                    Products product = productsRepository.findById(savedDetail.getVariant().getProductId())
                            .orElseThrow(() -> new Exception("Product not found with ID: " + savedDetail.getVariant().getProductId()));

                    totalPrice += quantity * product.getPrice();
                }
            }

            purchaseOrder.setTotalPrice(Math.round(totalPrice * 100.0) / 100.0); // Redondea a 2 decimales
            purchaseOrder = purchase_ordersRepository.save(purchaseOrder);

            return PurchaseOrderMapper.toDto(purchaseOrder);
        } catch (Exception e) {
            throw new Exception("Error al guardar la orden de compra: " + e.getMessage());
        }
    }


   @Transactional
    public PurchaseOrderDTO update(CreateUpdatePurchaseOrderDTO dto, Long id) throws Exception {
        try {
            Purchase_orders purchaseOrder = purchase_ordersRepository.findById(id)
                    .orElseThrow(() -> new Exception("Orden de compra no encontrada con ID: " + id));

            purchaseOrder.setUser(usersService.findById(dto.getUserId()));

            if (dto.getStatus() != null) {
                purchaseOrder.setStatus(dto.getStatus());
            }

            if (purchaseOrder.getDetails() != null) {
                purchaseOrder.getDetails().clear();
            }

            purchaseOrder = purchase_ordersRepository.save(purchaseOrder);

            double totalPrice = 0.0;

            if (dto.getDetails() != null && !dto.getDetails().isEmpty()) {
                for (CreateUpdateDetailDTO detailDTO : dto.getDetails()) {
                    detailDTO.setPurchaseOrderId(purchaseOrder.getId());
                    DetailDTO savedDetail = detailsService.save(detailDTO);

                    int quantity = savedDetail.getQuantity();
                    Products product = productsRepository.findById(savedDetail.getVariant().getProductId())
                            .orElseThrow(() -> new Exception("Producto no encontrado con ID: " + savedDetail.getVariant().getProductId()));

                    totalPrice += quantity * product.getPrice();
                }
            }

            purchaseOrder.setTotalPrice(Math.round(totalPrice * 100.0) / 100.0); // Redondea a 2 decimales
            purchaseOrder = purchase_ordersRepository.save(purchaseOrder);

            return PurchaseOrderMapper.toDto(purchaseOrder);
        } catch (Exception e) {
            throw new Exception("Error al actualizar la orden de compra: " + e.getMessage());
        }
    }



    @Transactional
    public List<PurchaseOrderDTO> getAll() throws Exception {
        List<Purchase_orders> purchaseOrders = super.findAll();
        return purchaseOrders.stream().map(PurchaseOrderMapper::toDto).toList();
    }

    @Transactional
    public PurchaseOrderDTO getById(Long id) throws Exception {
        Purchase_orders purchaseOrder = super.findById(id);
        return PurchaseOrderMapper.toDto(purchaseOrder);
    }

    @Transactional
    public PreferenceRequest buildPreference(Purchase_orders order) {
        List<PreferenceItemRequest> items = new ArrayList<>();
        order.getDetails().forEach(detail -> {
            if (detail.getVariant() == null || detail.getVariant().getProduct() == null) {
                throw new IllegalStateException(
                        "El detalle con ID " + detail.getId() + " no tiene variante o producto asociado.");
            }
            items.add(PreferenceItemRequest.builder()
                    .id(detail.getVariant().getProduct().getId().toString())
                    .title(detail.getVariant().getProduct().getName())
                    .description(detail.getVariant().getProduct().getDescription())
                    .unitPrice(BigDecimal.valueOf(detail.getVariant().getProduct().getPrice()))
                    .quantity(detail.getQuantity())
                    .build());
        });

        PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                .success("https://localhost/success")
                .failure("https://localhost/failure")
                .pending("https://localhost/pending")
                .build();

        return PreferenceRequest.builder()
                .items(items)
                .backUrls(backUrls)
                .autoReturn("approved")
                .externalReference(String.valueOf(order.getId()))
                .build();
    }

    public void processWebhook(String type, String dataId) throws Exception {
        if ("payment".equals(type)) {
            PaymentClient paymentClient = new PaymentClient();
            Payment payment = paymentClient.get(Long.parseLong(dataId));

            String externalReference = payment.getExternalReference();
            Purchase_orders order = purchase_ordersRepository.findById(Long.parseLong(externalReference))
                    .orElseThrow(() -> new Exception("Orden no encontrada"));

            switch (payment.getStatus()) {
                case "approved" -> order.setStatus(Status.APPROVED);
                case "pending" -> order.setStatus(Status.PENDING);
                case "rejected" -> order.setStatus(Status.REJECTED);
                default -> order.setStatus(Status.PENDING);
            }

            purchase_ordersRepository.save(order);
        }
    }
}