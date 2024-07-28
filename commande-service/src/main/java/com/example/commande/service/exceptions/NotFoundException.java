package com.example.commande.service.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(Long id) {
        super ("Aucune commande trouvée avec l'ID : "+ id);
    }
    public NotFoundException(String personnelId) {
        super ("Aucune personnel trouvée avec l'ID : "+ personnelId);
    }
}