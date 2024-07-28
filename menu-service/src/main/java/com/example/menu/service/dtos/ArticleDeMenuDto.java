package com.example.menu.service.dtos;

import lombok.experimental.FieldDefaults;

import lombok.Setter;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDeMenuDto {
    String nom;
    String plat;
    String entree;
    String description;
    Double prix;
    boolean disponibilite;
    Double evaluation;
}