package com.example.personnel.service.repository;

import com.example.personnel.service.models.Personnel;
import com.example.personnel.service.models.TypePersonnel;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel,Long> {
    List<Personnel> findByTypePersonnel(TypePersonnel typePersonnel);
    boolean existsPersonnelByCodePersonnel(String code);
}