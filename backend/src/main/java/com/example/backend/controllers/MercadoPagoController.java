package com.example.backend.controllers;

import com.example.backend.models.entities.Purchase_orders;
import com.example.backend.services.Purchase_ordersServiceImpl;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.mercadopago.resources.preference.Preference;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/pay")
@RequiredArgsConstructor
public class MercadoPagoController {

    private final Purchase_ordersServiceImpl purchaseOrdersService;

    @Value("${mercadopago.access.token}")
    private String mercadoPagoAccessToken;

    @PostMapping("/mp")
    @CrossOrigin("*")
    public ResponseEntity<Map<String, Object>> crearOrden(@RequestBody Purchase_orders purchase_orders) throws Exception {

        MercadoPagoConfig.setAccessToken(mercadoPagoAccessToken);

        Purchase_orders ordenCreada = purchaseOrdersService.save(purchase_orders);

        // Volvés a crear la preferencia para obtener el init_point
        PreferenceClient client = new PreferenceClient();
        PreferenceRequest preferenceRequest = purchaseOrdersService.buildPreference(ordenCreada);
        Preference preference = client.create(preferenceRequest);

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("purchaseOrder", ordenCreada);
        respuesta.put("initPoint", preference.getInitPoint());

        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
    }

    /**
     * Obtener el estado de la orden de compra.
     */
    @GetMapping("/state/{id}")
    public ResponseEntity<Map<String, String>> getState(@PathVariable Long id) throws Exception {
        Purchase_orders order = purchaseOrdersService.findById(id);
        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Orden no encontrada con ID: " + id));
        }

        return ResponseEntity.ok(Map.of(
                "estado", order.getStatus() != null ? order.getStatus().name() : "Sin estado",
                "metodoPago", order.getPaymentMethod() != null ? order.getPaymentMethod().name() : "Sin método"
        ));
    }


    /**
     * Consultar todas las órdenes.
     */
    @GetMapping("/orders")
    public ResponseEntity<?> findAllOrders() throws Exception {
        List<Purchase_orders> orders = purchaseOrdersService.findAll();
        return ResponseEntity.ok(orders);
    }

    /**
     * Procesar una notificación de webhook de MercadoPago.
     */
    @PostMapping("/webhook")
    public ResponseEntity<String> processWebhook(@RequestBody Map<String, Object> body) {
        try {
            if (body == null) {
                return ResponseEntity.badRequest().body("El body está vacío.");
            }

            Object typeObj = body.get("type");
            Object dataObj = body.get("data");

            if (typeObj == null || dataObj == null) {
                return ResponseEntity.badRequest().body("Faltan campos 'type' o 'data' en el body.");
            }

            String type = typeObj.toString();

            if (!(dataObj instanceof Map)) {
                return ResponseEntity.badRequest().body("El campo 'data' no tiene el formato esperado.");
            }

            Map<?, ?> dataMap = (Map<?, ?>) dataObj;
            Object idObj = dataMap.get("id");

            if (idObj == null) {
                return ResponseEntity.badRequest().body("El campo 'id' no está presente dentro de 'data'.");
            }

            String dataId = idObj.toString();

            purchaseOrdersService.processWebhook(type, dataId);

            return ResponseEntity.ok("Webhook procesado correctamente.");
        } catch (Exception e) {
            // Aquí puedes usar un logger para guardar el error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error procesando webhook: " + e.getMessage());
        }
    }
}
