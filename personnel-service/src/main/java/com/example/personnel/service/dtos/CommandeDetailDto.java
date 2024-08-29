package com.example.personnel.service.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import java.util.Date;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandeDetailDto {
    Long id;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    Date dateCommande;
    @JsonFormat(pattern = "dd/MM/yyyy")
    Date dateLivraison;
    Double montantTotal;
    String commantaire;
    boolean traitement;
}