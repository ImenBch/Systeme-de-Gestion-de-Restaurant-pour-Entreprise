package com.example.image_service.exceptions;

public class NotFoundException extends RuntimeException{
    public NotFoundException() {
        super ("L'image n'existe pas.");
    }
}