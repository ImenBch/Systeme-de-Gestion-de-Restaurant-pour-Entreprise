package com.example.personnel.service.dtos;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;
import lombok.AccessLevel;

import com.example.personnel.service.models.TypePersonnel;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PersonnelDto {
    String nom;
    String codePersonnel;
    String email;
    String telephone;
    @Enumerated(EnumType.STRING)
    TypePersonnel typePersonnel;
}