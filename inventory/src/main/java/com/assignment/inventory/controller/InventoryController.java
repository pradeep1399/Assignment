package com.assignment.inventory.controller;

import com.assignment.inventory.model.Inventory;
import com.assignment.inventory.service.InventroyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class InventoryController {

    @Autowired
    InventroyService inventroyService;

    @PostMapping("/deduct")
    public ResponseEntity<String> deductInventory(@RequestParam String productId, @RequestParam int quantity){
        boolean success = inventroyService.deductInventory(productId, quantity);
        if(success){
            return ResponseEntity.ok("Inventory deducted successfully");
        } else{
            return ResponseEntity.status(200).body("Insufficient inventory or product not found");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addInventory(@RequestParam String productId, @RequestParam int quantity){
        boolean success = inventroyService.addInventory(productId, quantity);
        if(success){
            return ResponseEntity.status(201).body("added successfully");
        } else {
            return ResponseEntity.status(400).body("product not found");
        }
    }

    @GetMapping("inventory/{productId}")
    public ResponseEntity<Inventory> getInventory(@PathVariable String productId){
        Inventory inventory = inventroyService.getProduct(productId);
        if(inventory != null){
            return ResponseEntity.ok(inventory);
        }else{
            return ResponseEntity.status(404).body(null);
        }
    }
}
