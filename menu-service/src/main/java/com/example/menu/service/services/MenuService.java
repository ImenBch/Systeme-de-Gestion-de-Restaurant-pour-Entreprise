package com.example.menu.service.services;

import com.example.menu.service.dtos.ArticleDeMenuDto;
import com.example.menu.service.exceptions.AlreadyExistException;
import com.example.menu.service.exceptions.IllegalEvaluationException;
import com.example.menu.service.exceptions.NotFoundException;
import com.example.menu.service.mappers.ArticleDeMenuMapper;
import com.example.menu.service.models.ArticleDeMenu;
import com.example.menu.service.repositories.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class MenuService {
    @Autowired
    MenuRepository menuRepository;
    @Autowired
    ArticleDeMenuMapper articleDeMenuMapper;
    public List<ArticleDeMenu> getArticleMenus(){
        return menuRepository.findAll();
    }
    public ArticleDeMenu getArticleMenuById(Long id) {
        return menuRepository.findById(id).orElseThrow(()-> new NotFoundException(id));
    }
    public ArticleDeMenu getArticleMenuByNom(String nom){
        return  menuRepository.findByNom(nom);
    }
    public  ArticleDeMenu postArticleMenu(ArticleDeMenuDto articleDeMenu, MultipartFile image) throws IOException {
        if(menuRepository.existsArticleDeMenuByNom(articleDeMenu.getNom())){
            throw new AlreadyExistException(articleDeMenu.getNom());
        }
        articleDeMenu.setEvaluation(0.0); // evaluation par defaut
        ArticleDeMenu newArticleDeMenu= articleDeMenuMapper.fromDto(articleDeMenu);
        // save the image
        saveImage(image,newArticleDeMenu);
        return menuRepository.save(newArticleDeMenu);
    }
    public ArticleDeMenu updateArticleMenu (Long id, ArticleDeMenuDto articleDeMenu, MultipartFile image) throws IOException {
        ArticleDeMenu updatedArticleDeMenu = menuRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
        if(menuRepository.existsArticleDeMenuByNom(articleDeMenu.getNom()) && !articleDeMenu.getNom().equalsIgnoreCase(updatedArticleDeMenu.getNom())){
            throw new AlreadyExistException(articleDeMenu.getNom());
        }
        articleDeMenuMapper.fromDto(articleDeMenu,updatedArticleDeMenu);
        if(image != null && !image.isEmpty()){
            saveImage(image,updatedArticleDeMenu);
        }
        return menuRepository.save(updatedArticleDeMenu);
    }
    public ArticleDeMenu updateDisponibilite (Long id, boolean nouvelleDisponibilite){
        ArticleDeMenu articleDeMenu = menuRepository.findById(id).orElseThrow(()-> new NotFoundException(id));
        articleDeMenu.setDisponibilite(nouvelleDisponibilite);
        return menuRepository.save(articleDeMenu);
    }
    public ArticleDeMenu addEvaluation(Long id,String userId, Double newEvaluation) {
        ArticleDeMenu article = menuRepository.findById(id).orElseThrow(()-> new NotFoundException(id));
        if (newEvaluation < 0 || newEvaluation > 5) {
            throw new IllegalEvaluationException("L'évaluation doit être comprise entre 0 et 5.");
        }
        Double previousEvaluation = article.getUserEvaluations().getOrDefault(userId, 0.0);
        article.setSommeEvaluation(article.getSommeEvaluation() - previousEvaluation + newEvaluation);
        article.setNombreEvaluation(article.getNombreEvaluation() - (previousEvaluation > 0 ? 1 : 0) + 1);
        article.setEvaluation(article.getSommeEvaluation() / article.getNombreEvaluation());
        article.getUserEvaluations().put(userId, newEvaluation);
        return menuRepository.save(article);
    }

    public void deleteArticleMenu(Long id){
        if(!menuRepository.existsById(id)){
            throw new NotFoundException(id);
        }
        menuRepository.deleteById(id);
    }
    public ArticleDeMenu getMostEvaluatedArticle(){
        return menuRepository.findMostEvaluated();
    }
    private void saveImage(MultipartFile image, ArticleDeMenu articleDeMenu) throws IOException {
        Path path = Paths.get(System.getProperty("user.home"), "menu-app-images", "images");
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
        String originalImageName = image.getOriginalFilename();
        String uniqueImageName = UUID.randomUUID() + "_" + originalImageName;
        Path imagePath = Paths.get(System.getProperty("user.home"), "menu-app-images", "images", uniqueImageName);
        Files.copy(image.getInputStream(), imagePath);
        articleDeMenu.setImage(uniqueImageName);
    }
}