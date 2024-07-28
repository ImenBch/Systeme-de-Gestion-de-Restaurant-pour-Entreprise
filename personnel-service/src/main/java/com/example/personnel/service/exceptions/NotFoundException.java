package com.example.personnel.service.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(Long id) {
        super ("Aucun employé trouvé avec l'ID : "+ id);
    }
}