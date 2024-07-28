package com.example.menu.service.repositories;

import com.example.menu.service.models.ArticleDeMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<ArticleDeMenu,Long> {
    ArticleDeMenu findByNom(String nom);
    boolean existsArticleDeMenuByNom(String nom);
    @Query(value = "SELECT * FROM article_de_menu ORDER BY evaluation DESC LIMIT 1", nativeQuery = true)
    ArticleDeMenu findMostEvaluated();
}