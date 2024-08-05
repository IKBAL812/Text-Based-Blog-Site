package com.ikbal.blogServer.service.jwt;

import com.ikbal.blogServer.entity.Customer;
import com.ikbal.blogServer.repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements UserDetailsService,CustomerService {


    private final CustomerRepository customerRepository;

    private final PasswordEncoder passwordEncoder;



    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //Write logic to fetch customer from the database
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with that email does not exist"));
        return new User(customer.getEmail(), customer.getPassword(), Collections.emptyList());

    }

    public Customer getUserByEmail(String email) throws UsernameNotFoundException{
        Optional<Customer> optionalCustomer = customerRepository.findByEmail(email);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            return customerRepository.save(customer);
        }else{
            throw new UsernameNotFoundException("User with that email does not exist!");
        }
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public void deleteCustomer(Long id) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if(optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            customerRepository.delete(customer);
        }else{
            throw new EntityNotFoundException("Customer Not Found");
        }
    }

    public Customer changePassword(String email, String newPassword) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Customer not found with email " + email));

        String encodedPassword = passwordEncoder.encode(newPassword);
        customer.setPassword(encodedPassword);
        customer.setResetCode("null");
        return customerRepository.save(customer);
    }
}
