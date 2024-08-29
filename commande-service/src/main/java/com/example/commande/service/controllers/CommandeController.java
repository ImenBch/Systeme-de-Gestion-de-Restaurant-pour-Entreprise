package com.example.commande.service.controllers;

import com.example.commande.service.dtos.CommandeCreationDTO;
import com.example.commande.service.dtos.CommandeDto;
import com.example.commande.service.dtos.CommandePersonnelDto;
import com.example.commande.service.services.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commandes")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @GetMapping("/personnel/{personnelId}")
    public ResponseEntity<List<CommandePersonnelDto>> getCommandeByPersonnel(@PathVariable("personnelId") String personnelId){
        List<CommandePersonnelDto> commandeList = commandeService.getCommandeByPersonnel(personnelId);
        return new ResponseEntity<>(commandeList,HttpStatus.OK);
    }
    // Endpoints With Restaurant Staff Role
    @PatchMapping("/restaurantstaff/{id}")
    public ResponseEntity<CommandeDto> updateTraitement(@PathVariable Long id , @RequestParam boolean traitement){
        CommandeDto commande=commandeService.updateTraitement(id,traitement);
        return new ResponseEntity<>(commande,HttpStatus.OK);
    }
    // Endpoints With Restaurant Staff & Admin Roles
    @GetMapping("/admin-restaurantstaff")
    public ResponseEntity<List<CommandeDto>> getCommandes(){
        List<CommandeDto> commandeDtoList= commandeService.getCommandes();
        return new ResponseEntity<>(commandeDtoList, HttpStatus.OK);
    }
    @GetMapping("/admin-restaurantstaff/{id}")
    public ResponseEntity<CommandeDto> getCommande(@PathVariable Long id){
        CommandeDto commandeDto = commandeService.getCommandeById(id);
        return new ResponseEntity<>(commandeDto, HttpStatus.OK);
    }
    // Endpoints With Restaurant Staff & User Roles
    @PostMapping("/user-restaurantstaff")
    public ResponseEntity<CommandeDto> saveCommande(@RequestBody CommandeCreationDTO newCommande){
        CommandeDto commandeDto= commandeService.saveCommande(newCommande);
        return new ResponseEntity<>(commandeDto, HttpStatus.CREATED);
    }
    @DeleteMapping("/user-restaurantstaff/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable("id") Long id){
        commandeService.deleteCommande(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}