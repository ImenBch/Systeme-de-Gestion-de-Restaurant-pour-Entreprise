package com.example.commande.service.repositories;

import com.example.commande.service.models.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface  CommandeRepository extends JpaRepository<Commande,Long> {
    List<Commande> findByPersonnelId(String personnelId);
    boolean existsCommandeByPersonnelId(String personnelId);
}