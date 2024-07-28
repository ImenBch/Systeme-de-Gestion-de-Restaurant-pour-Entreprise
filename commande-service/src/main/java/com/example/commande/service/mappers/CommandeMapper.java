package com.example.commande.service.mappers;

import com.example.commande.service.dtos.CommandeCreationDTO;
import com.example.commande.service.dtos.CommandeDetailDto;
import com.example.commande.service.models.Commande;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommandeMapper {
    CommandeDetailDto toCommandeDetailDto(Commande commande);
    Commande FromCommandeCreationDto(CommandeCreationDTO commandeCreationDTO);
}