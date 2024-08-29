package com.example.personnel.service.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    String id;
    String firstName;
    String lastName;
    String email;
}