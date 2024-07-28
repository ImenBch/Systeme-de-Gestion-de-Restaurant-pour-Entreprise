package com.example.personnel.service.controller;

import com.example.personnel.service.dtos.CommandePersonnelDto;
import com.example.personnel.service.dtos.PersonnelDto;
import com.example.personnel.service.models.Personnel;
import com.example.personnel.service.service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personnel")
public class PersonnelController {
    @Autowired
    private PersonnelService personnelService;
    @GetMapping("{id}/commandes")
    public ResponseEntity<List<CommandePersonnelDto>> getHistoriqueCommande(@PathVariable("id") Long personnelId){
        List<CommandePersonnelDto> commandePersonnelDtoList= personnelService.getHistoriqueCommande(personnelId);
        return new ResponseEntity<>(commandePersonnelDtoList,HttpStatus.OK);
    }
    // Endpoints With Admin role
    @GetMapping("/admin/{id}")
    public ResponseEntity<Personnel> getPersonnel(@PathVariable("id") Long id){
        Personnel personnel= personnelService.getPersonnel(id);
        return new ResponseEntity<>(personnel, HttpStatus.OK);
    }
    @GetMapping("admin/employes")
    public ResponseEntity<List<Personnel>> getPersonnel(){
        List<Personnel> employes = personnelService.getEmployes();
        return new ResponseEntity<>(employes, HttpStatus.OK);
    }
    @GetMapping("admin/PersonnelRestaurant")
    public ResponseEntity<List<Personnel>> getPersonnelRestaurant(){
        List<Personnel> personnelRestaurantList= personnelService.getPersonnelRestaurant();
        return new ResponseEntity<>(personnelRestaurantList, HttpStatus.OK);
    }
    @PostMapping("/admin")
    public ResponseEntity<Personnel> savePersonnel(@RequestBody PersonnelDto newPersonnel){
        Personnel savedPersonnel= personnelService.savePersonnel(newPersonnel);
        return new ResponseEntity<>(savedPersonnel,HttpStatus.CREATED);
    }
    @PutMapping("admin/{id}")
    public ResponseEntity<Personnel> updatePersonnel(@PathVariable("id") Long id, @RequestBody PersonnelDto updatedPersonnel){
        Personnel personnel= personnelService.updatePersonnel(id,updatedPersonnel);
        return new ResponseEntity<>(personnel,HttpStatus.CREATED);
    }
    @DeleteMapping("admin/{id}")
    public ResponseEntity<String> deletePersonnel(@PathVariable("id") Long id){
        String deleteMsg= personnelService.deletePersonnel(id);
        return new ResponseEntity<>(deleteMsg,HttpStatus.CREATED);
    }
}