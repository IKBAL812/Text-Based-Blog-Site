package com.ikbal.blogServer.service;

import com.ikbal.blogServer.dto.SignupRequest;
import com.ikbal.blogServer.entity.Customer;
import com.ikbal.blogServer.repository.CustomerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final CustomerRepository customerRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean createCustomer(SignupRequest signupRequest) {
        //check if customer already exists
        if(customerRepository.existsByEmail(signupRequest.getEmail())){
            return false;
        }

        Customer customer = new Customer();
        BeanUtils.copyProperties(signupRequest, customer);

        //Hash the password before saving
        String hashedPassword = passwordEncoder.encode(signupRequest.getPassword());
        customer.setPassword(hashedPassword);
        customer.setResetCode("null");
        customerRepository.save(customer);
        return true;
    }
}
