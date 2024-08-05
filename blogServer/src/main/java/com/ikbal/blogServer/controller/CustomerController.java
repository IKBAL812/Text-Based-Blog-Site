package com.ikbal.blogServer.controller;


import com.ikbal.blogServer.dto.ChangeRequest;
import com.ikbal.blogServer.entity.Customer;
import com.ikbal.blogServer.service.jwt.CustomerService;
import com.ikbal.blogServer.service.jwt.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

//user commands (need to be authenticated to use them)
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerServiceImpl customerService) {
        this.customerService = customerService;
    }


    @GetMapping("/{userEmail}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String userEmail) {
        try{
            Customer customer = customerService.getUserByEmail(userEmail);
            return ResponseEntity.ok(customer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
