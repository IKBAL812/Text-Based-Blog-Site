package com.ikbal.blogServer.service.jwt;

import com.ikbal.blogServer.entity.Customer;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface CustomerService {
    Customer getUserByEmail(String email);

    List<Customer> getAllCustomers();

    Customer changePassword(String email, String newPassword);

    void deleteCustomer(Long id);

    UserDetails loadUserByUsername(String username);

}
