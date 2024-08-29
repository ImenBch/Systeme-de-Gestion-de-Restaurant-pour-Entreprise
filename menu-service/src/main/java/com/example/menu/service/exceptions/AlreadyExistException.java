package com.example.menu.service.exceptions;

public class AlreadyExistException extends RuntimeException{
    public AlreadyExistException(String nom) {
        super("Le nom \""+nom+"\" existe déja.");
    }
}