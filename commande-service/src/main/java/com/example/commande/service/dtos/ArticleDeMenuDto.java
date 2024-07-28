package com.example.commande.service.dtos;

import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDeMenuDto {
    Long id;
    String nom;
    Double prix;
    boolean disponibilite;
}