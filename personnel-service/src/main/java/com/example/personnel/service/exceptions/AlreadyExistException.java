package com.example.personnel.service.exceptions;

public class AlreadyExistException extends RuntimeException{
    public AlreadyExistException(String code) {
        super("Le code "+code+" existe déja");
    }
}