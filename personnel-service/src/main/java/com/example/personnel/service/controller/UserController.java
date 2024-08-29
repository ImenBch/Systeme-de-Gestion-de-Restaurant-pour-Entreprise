package com.example.personnel.service.controller;

import com.example.personnel.service.dtos.CommandePersonnelDto;
import com.example.personnel.service.dtos.UserDto;
import com.example.personnel.service.models.User;
import com.example.personnel.service.service.KeycloakUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private KeycloakUserService keycloakUserService;

    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable String id) {
         return keycloakUserService.getUserById(id);
    }
    @PostMapping
    public List<User> SaveUsers() {
        return keycloakUserService.saveUsers();
    }
    @GetMapping("/{id}/commandes")
    public ResponseEntity<List<CommandePersonnelDto>> getHistoriqueCommande(@PathVariable("id") String userId){
        List<CommandePersonnelDto> commandePersonnelDtoList= keycloakUserService.getHistoriqueCommande(userId);
        return new ResponseEntity<>(commandePersonnelDtoList, HttpStatus.OK);
    }
}