package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.PurchaseOrdersDTO;
import com.example.backend.models.entities.Purchase_orders;
import com.example.backend.services.Purchase_ordersServiceImpl;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/purchase_orders")
public class Purchase_ordersController extends BaseControllerImpl<Purchase_orders, Purchase_ordersServiceImpl> {
    
    @Autowired
    private Purchase_ordersServiceImpl purchaseOrdersService;

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrdersDTO> getPurchaseOrderById(@PathVariable Long id) throws Exception {
        PurchaseOrdersDTO purchaseOrdersDTO = purchaseOrdersService.getById(id);
        return ResponseEntity.ok(purchaseOrdersDTO);
    }

    @GetMapping("/")
    public ResponseEntity<List<PurchaseOrdersDTO>> getAllPurchaseOrders() throws Exception {
        List<PurchaseOrdersDTO> purchaseOrdersDTOs = purchaseOrdersService.getAll();
        return ResponseEntity.ok(purchaseOrdersDTOs);
    }

    @PostMapping("/")
    public ResponseEntity<PurchaseOrdersDTO> createPurchaseOrder(@RequestBody PurchaseOrdersDTO purchaseOrdersDTO) throws Exception {
        PurchaseOrdersDTO createdPurchaseOrder = purchaseOrdersService.save(purchaseOrdersDTO);
        return ResponseEntity.ok(createdPurchaseOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseOrdersDTO> updatePurchaseOrder(@PathVariable Long id, @RequestBody PurchaseOrdersDTO purchaseOrdersDTO) throws Exception {
        PurchaseOrdersDTO updatedPurchaseOrder = purchaseOrdersService.update(purchaseOrdersDTO, id);
        return ResponseEntity.ok(updatedPurchaseOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(purchaseOrdersService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

}
