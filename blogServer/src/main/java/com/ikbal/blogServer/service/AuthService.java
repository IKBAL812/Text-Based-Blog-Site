package com.ikbal.blogServer.service;

import com.ikbal.blogServer.dto.SignupRequest;

public interface AuthService {
    boolean createCustomer(SignupRequest signupRequest);
}
