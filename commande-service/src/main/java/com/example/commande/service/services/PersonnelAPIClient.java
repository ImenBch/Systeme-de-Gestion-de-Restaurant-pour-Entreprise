package com.example.commande.service.services;

import com.example.commande.service.dtos.PersonnelDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="Personnel-service")
public interface PersonnelAPIClient {
    @GetMapping("/users/{id}")
    PersonnelDto getUserById(@PathVariable("id") String id );
}