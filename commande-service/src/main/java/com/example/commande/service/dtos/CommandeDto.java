package com.example.commande.service.dtos;

import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandeDto {
    CommandeDetailDto commandeDetailDto;
    PersonnelDto personnelDto;
    List<ArticleDeCommandeDto> articleDeCommandeDtos;
}