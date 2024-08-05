package com.ikbal.blogServer.controller;


import com.ikbal.blogServer.entity.Customer;
import com.ikbal.blogServer.service.AuthService;
import com.ikbal.blogServer.service.jwt.CustomerService;
import com.ikbal.blogServer.service.jwt.CustomerServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//admin commands (need to be authenticated to use them)
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final CustomerService customerService;

    public AdminController(CustomerService customerService) {
        this.customerService = customerService;
    }


    //gets all users
    @GetMapping("/users")
    public ResponseEntity<List<Customer>> getAllUsers(){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(customerService.getAllCustomers());
        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //delete a user
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long userId){
        try {
            customerService.deleteCustomer(userId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}