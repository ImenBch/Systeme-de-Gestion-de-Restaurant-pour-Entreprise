package com.example.menu.service.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(Long id) {
        super ("Aucun article de menu trouvé avec l'ID : "+ id);
    }
}