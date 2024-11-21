package com.assignment.inventory.service;

import com.assignment.inventory.model.Inventory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventroyService {

     List<Inventory>  list = new ArrayList<>();

     public InventroyService(){
         list.add(new Inventory("product1", 80));
         list.add(new Inventory("product2", 60));
         list.add(new Inventory("product3", 40));
     }


     public boolean deductInventory(String productId, int quantity){
         Inventory inventory = list.stream()
                 .filter(item -> item.getProductId().equals(productId))
                 .findFirst()
                 .orElse(null);

         if(inventory != null){
             if(inventory.getQuantity() < quantity){
                 return false;

             }
             inventory.setQuantity(inventory.getQuantity() - quantity);
             return true;
         }
         return false;
     }

     public boolean addInventory(String productId, int quantity){
         Inventory inventory = list.stream()
                 .filter(item -> item.getProductId().equals(productId))
                 .findFirst()
                 .orElse(null);
         if(inventory != null){
             inventory.setQuantity(inventory.getQuantity() + quantity);
             return true;
         }

//         else if(inventory == null){
//             list.add(new Inventory(productId, quantity));
//             return true;
//         }
         return false;
     }

     public Inventory getProduct(String productId){
         return list.stream().filter(item -> item.getProductId().equals(productId)).findFirst().orElse(null);
     }
}
