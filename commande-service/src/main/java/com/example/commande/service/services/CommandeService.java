package com.example.commande.service.services;

import com.example.commande.service.dtos.*;
import com.example.commande.service.exceptions.NotFoundException;
import com.example.commande.service.mappers.CommandeMapper;
import com.example.commande.service.models.ArticleDeCommande;
import com.example.commande.service.repositories.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.commande.service.models.Commande;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommandeService {
    @Autowired
    private CommandeRepository commandeRepository;
    @Autowired
    private PersonnelAPIClient personnelAPIClient;
    @Autowired
    private MenuAPIClient menuAPIClient;
    @Autowired
    CommandeMapper commandeMapper;

    public CommandeDto saveCommande(CommandeCreationDTO commande) {
        Double montantTotal = commande.getArticleDeCommandeList().stream()
                .mapToDouble(article -> {
                    ArticleDeMenuDto articleDeMenuDto = menuAPIClient.getArticleMenuById(article.getMenuId());
                    return articleDeMenuDto.getPrix() * article.getQuantite();
                })
                .sum();
        Commande newCommande = commandeMapper.FromCommandeCreationDto(commande);
        newCommande.setMontantTotal(montantTotal);
        newCommande.setDateCommande(Instant.now());
        return  convertToCommandeDto(commandeRepository.save(newCommande));
    }
    public List<CommandeDto> getCommandes(){
        return commandeRepository.findAll().stream()
                .map(this::convertToCommandeDto)
                .collect(Collectors.toList());
    }

    public CommandeDto getCommandeById(Long commandeId) {
        Commande commande = commandeRepository.findById(commandeId).orElseThrow(()-> new NotFoundException(commandeId));
        return convertToCommandeDto(commande);
    }
    public List<CommandePersonnelDto> getCommandeByPersonnel(String personnelId){
        if(!commandeRepository.existsCommandeByPersonnelId(personnelId)){
            throw new NotFoundException(personnelId);
        }
        return commandeRepository.findByPersonnelId(personnelId).stream()
                .map(this::convertToCommandePersonnelDto)
                .collect(Collectors.toList());
    }
    public String deleteCommande (Long id){
        if(!commandeRepository.existsById(id)){
            throw new NotFoundException(id);
        }
        commandeRepository.deleteById(id);
        return "Commande annulée";
    }

    private CommandeDto convertToCommandeDto(Commande commande) {
        CommandeDetailDto commandeDetailDto = commandeMapper.toCommandeDetailDto(commande);
        PersonnelDto personnelDto = personnelAPIClient.getPersonnelById(commande.getPersonnelId());

        List<ArticleDeCommandeDto> articleDeCommandeDtoList = commande.getArticleDeCommandeList().stream()
                .map(this::convertToArticleDeCommandeDto)
                .collect(Collectors.toList());

        return new CommandeDto(commandeDetailDto, personnelDto, articleDeCommandeDtoList);
    }
    private CommandePersonnelDto convertToCommandePersonnelDto(Commande commande) {
        CommandeDetailDto commandeDetailDto = commandeMapper.toCommandeDetailDto(commande);

        List<ArticleDeCommandeDto> articleDeCommandeDtoList = commande.getArticleDeCommandeList().stream()
                .map(this::convertToArticleDeCommandeDto)
                .collect(Collectors.toList());

        return new CommandePersonnelDto(commandeDetailDto, articleDeCommandeDtoList);
    }
    private ArticleDeCommandeDto convertToArticleDeCommandeDto(ArticleDeCommande articleDeCommande) {
        ArticleDeMenuDto articleDeMenuDto = menuAPIClient.getArticleMenuById(articleDeCommande.getMenuId());
        return new ArticleDeCommandeDto(articleDeMenuDto, articleDeCommande.getQuantite());
    }
}