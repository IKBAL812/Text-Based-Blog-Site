package com.ikbal.blogServer.controller;

import com.ikbal.blogServer.dto.LoginRequest;
import com.ikbal.blogServer.dto.LoginResponse;
import com.ikbal.blogServer.service.jwt.CustomerService;
import com.ikbal.blogServer.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

//login functions (no need to be authenticated since user is not logged in)
@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginController {
    private final AuthenticationManager authenticationManager;

    private final CustomerService customerService;

    private final JwtUtil jwtUtil;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, CustomerService customerService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.customerService = customerService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        UserDetails userDetails;
        try{
            userDetails = customerService.loadUserByUsername(loginRequest.getEmail());
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        }catch(AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }


        String jwt = jwtUtil.generateToken(userDetails.getUsername());


        return ResponseEntity.ok(new LoginResponse(jwt));
    }
}
