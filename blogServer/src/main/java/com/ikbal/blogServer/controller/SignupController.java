package com.ikbal.blogServer.controller;

import com.ikbal.blogServer.dto.ChangeRequest;
import com.ikbal.blogServer.dto.SignupRequest;
import com.ikbal.blogServer.entity.Customer;
import com.ikbal.blogServer.service.AuthService;
import com.ikbal.blogServer.service.jwt.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

//sign up functions (no need to be authenticated since user does not have an account)
@RestController
@RequestMapping("/signup")
@CrossOrigin(origins = "*")
public class SignupController {

    private final AuthService authService;

    private final CustomerService customerService;

    @Autowired
    public SignupController(AuthService authService, CustomerService customerService) {
        this.authService = authService;
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<String> signupCustomer(@RequestBody SignupRequest signupRequest){
        boolean isUserCreated = authService.createCustomer(signupRequest);
        if(isUserCreated){
            return ResponseEntity.status(HttpStatus.CREATED).body("Customer created successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer already exists!");
        }
    }

    @PutMapping("/changePassword/{email}")
    public ResponseEntity<?> changePassword(@PathVariable String email, @RequestBody ChangeRequest changeRequest) {
        try{
            Customer customer = customerService.changePassword(email,changeRequest.getNewPassword());
            return ResponseEntity.ok(customer);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
