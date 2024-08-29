package com.example.menu.service.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.experimental.FieldDefaults;
import lombok.Setter;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ArticleDeMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String nom;
    String plat;
    String entree;
    String description;
    Double prix;
    boolean disponibilite;
    String image;
    Double evaluation =0.0;
    @JsonIgnore
    Double sommeEvaluation= 0.0;
    @JsonIgnore
    int nombreEvaluation = 0;
    @JsonIgnore
    @ElementCollection
    private Map<String, Double> userEvaluations = new HashMap<>(); // Clé : userId, Valeur : évaluation
}