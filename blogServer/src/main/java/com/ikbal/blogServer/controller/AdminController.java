package com.ikbal.blogServer.controller;


import com.ikbal.blogServer.entity.Customer;
import com.ikbal.blogServer.service.AuthService;
import com.ikbal.blogServer.service.jwt.CustomerService;
import com.ikbal.blogServer.service.jwt.CustomerServiceImpl;
import com.ikbal.blogServer.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

//admin commands (need to be authenticated to use them)
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private JwtUtil jwtUtil;

    private final CustomerService customerService;

    public AdminController(CustomerService customerService) {
        this.customerService = customerService;
    }


    //gets all users
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers( @RequestHeader("Authorization") String token){
        try{
            String jwtToken = token.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(jwtToken);
            Customer customer = customerService.getUserByEmail(email);
            if (!Objects.equals(customer.getRole(), "admin")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You are not authorized to use this feature!");
            }
            return ResponseEntity.status(HttpStatus.OK).body(customerService.getAllCustomers());
        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //delete a user
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long userId,  @RequestHeader("Authorization") String token){
        try {
            String jwtToken = token.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(jwtToken);
            Customer customer = customerService.getUserByEmail(email);
            if (!Objects.equals(customer.getRole(), "admin")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You are not authorized to use this feature!");
            }
            customerService.deleteCustomer(userId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
