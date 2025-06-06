package com.example.backend.services;

import com.example.backend.models.entities.Details;
import com.example.backend.models.entities.Purchase_orders;
import com.example.backend.models.entities.Users;
import com.example.backend.models.enums.Status;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.DetailsRepository;
import com.example.backend.repositories.Purchase_ordersRepository;
import com.example.backend.repositories.UserRepository;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;

import jakarta.transaction.Transactional;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class Purchase_ordersServiceImpl extends BaseServiceImpl<Purchase_orders, Long> implements Purchase_ordersService {

    @Autowired
    private Purchase_ordersRepository purchaseOrdersRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DetailsRepository detailsRepository;

    @Getter
    private String ultimoInitPoint;

    public Purchase_ordersServiceImpl(BaseRepository<Purchase_orders, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public List<Purchase_orders> findAll() throws Exception {
        List<Purchase_orders> orders = super.findAll();
        for (Purchase_orders order : orders) {
            if (order.getUser() != null) {
                Users user = userRepository.findById(order.getUser().getId()).orElse(null);
                order.setUser(user);
            }
            List<Details> details = detailsRepository.findByPurchaseOrder(order);
            order.setDetails(details);
        }
        return orders;
    }

    @Override
    @Transactional
    public Purchase_orders findById(Long id) throws Exception {
        Purchase_orders order = super.findById(id);
        if (order.getUser() != null) {
            Users user = userRepository.findById(order.getUser().getId()).orElse(null);
            order.setUser(user);
        }
        List<Details> details = detailsRepository.findByPurchaseOrder(order);
        order.setDetails(details);
        return order;
    }

    @Override
    @Transactional
    public Purchase_orders save(Purchase_orders order) throws Exception {
        try {
            order.setStatus(Status.PENDING);

            // Crear preferencia en Mercado Pago
            PreferenceClient client = new PreferenceClient();
            PreferenceRequest preferenceRequest = buildPreference(order);
            Preference preference = client.create(preferenceRequest);

            ultimoInitPoint = preference.getInitPoint();

            Purchase_orders saved = purchaseOrdersRepository.save(order);

            if (saved.getUser() != null) {
                Users user = userRepository.findById(saved.getUser().getId()).orElse(null);
                saved.setUser(user);
            }

            List<Details> details = detailsRepository.findByPurchaseOrder(saved);
            saved.setDetails(details);

            return saved;
        } catch (Exception e) {
            throw new Exception("Error al guardar orden de compra: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Purchase_orders update(Purchase_orders order, Long id) throws Exception {
        try {
            Optional<Purchase_orders> existingOrder = purchaseOrdersRepository.findById(id);
            if (!existingOrder.isPresent()) {
                throw new Exception("Orden de compra no encontrada con ID: " + id);
            }

            order.setId(id);
            Purchase_orders updated = purchaseOrdersRepository.save(order);

            if (updated.getUser() != null) {
                Users user = userRepository.findById(updated.getUser().getId()).orElse(null);
                updated.setUser(user);
            }

            List<Details> details = detailsRepository.findByPurchaseOrder(updated);
            updated.setDetails(details);

            return updated;
        } catch (Exception e) {
            throw new Exception("Error al actualizar orden de compra: " + e.getMessage());
        }
    }

    @Transactional
    public PreferenceRequest buildPreference(Purchase_orders order) {
        List<PreferenceItemRequest> items = new ArrayList<>();
        order.getDetails().forEach(detail -> {
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
            Purchase_orders order = purchaseOrdersRepository.findById(Long.parseLong(externalReference))
                    .orElseThrow(() -> new Exception("Orden no encontrada"));

            switch (payment.getStatus()) {
                case "approved" -> order.setStatus(Status.APPROVED);
                case "pending" -> order.setStatus(Status.PENDING);
                case "rejected" -> order.setStatus(Status.REJECTED);
                default -> order.setStatus(Status.PENDING);
            }

            purchaseOrdersRepository.save(order);
        }
    }
}
