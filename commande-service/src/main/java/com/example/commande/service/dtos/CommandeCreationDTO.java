package com.example.commande.service.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.util.Date;
import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandeCreationDTO {
    @JsonFormat(pattern = "dd/MM/yyyy")
    Date dateLivraison;
    String commentaire;
    String personnelId;
    List<ArticleDeCommandeCreationDto> articleDeCommandeList;
}