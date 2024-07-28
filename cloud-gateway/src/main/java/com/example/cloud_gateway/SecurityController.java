package com.example.cloud_gateway;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SecurityController {
    @GetMapping("/auth")
    public Authentication authentication (Authentication authentication){
        return authentication;
    }
}
