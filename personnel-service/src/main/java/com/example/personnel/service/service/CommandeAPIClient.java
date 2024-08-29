package com.example.personnel.service.service;

import com.example.personnel.service.dtos.CommandePersonnelDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="commande-service")
public interface CommandeAPIClient {
    @GetMapping("/commandes/personnel/{personnelId}")
    List<CommandePersonnelDto> getHistoriqueCommandeById(@PathVariable String personnelId);
}