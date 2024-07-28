package com.example.menu.service.controllers;

import com.example.menu.service.models.ArticleDeMenu;
import com.example.menu.service.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    MenuService menuService;

    @GetMapping
    public ResponseEntity<List<ArticleDeMenu>> getArticleMenus(){
        List<ArticleDeMenu> articleDeMenuList= menuService.getArticleMenus();
        return new ResponseEntity<>(articleDeMenuList, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ArticleDeMenu> getArticleMenuById(@PathVariable("id") Long id){
        ArticleDeMenu articleDeMenu= menuService.getArticleMenuById(id);
        return new ResponseEntity<>(articleDeMenu,HttpStatus.OK);
    }
    @GetMapping("/search-by-name")
    public ResponseEntity<ArticleDeMenu> getArticleMenuByName(@RequestParam("name") String name){
        ArticleDeMenu articleDeMenu= menuService.getArticleMenuByNom(name);
        return new ResponseEntity<>(articleDeMenu,HttpStatus.OK);
    }
    @GetMapping("/mostEvaluatedArticle")
    public ResponseEntity<ArticleDeMenu> getMostEvaluatedArticle(){
        ArticleDeMenu articleDeMenu = menuService.getMostEvaluatedArticle();
        return new ResponseEntity<>(articleDeMenu,HttpStatus.OK);
    }
    // Endpoints with Admin role
    @PostMapping(path="/admin",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ArticleDeMenu> postArticleMenu(@RequestParam String nom, @RequestParam String plat, @RequestParam String entree, @RequestParam String description, @RequestParam Double prix, @RequestParam boolean disponibilite, @RequestParam Double evaluation, @RequestPart MultipartFile image) throws IOException {
        ArticleDeMenu newArticleDeMenu= menuService.postArticleMenu(nom, plat,entree,description,prix,disponibilite,evaluation,image);
        return new ResponseEntity<>(newArticleDeMenu, HttpStatus.OK);
    }
    @PutMapping(path= "admin/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ArticleDeMenu> updateArticleMenu(@PathVariable("id") Long id,@RequestParam  String nom, @RequestParam String plat,@RequestParam String entree,@RequestParam String description,@RequestParam Double prix,@RequestParam boolean disponibilite,@RequestParam Double evaluation,@RequestPart MultipartFile image) throws IOException {
        ArticleDeMenu articleDeMenu = menuService.updateArticleMenu(id,nom, plat,entree,description,prix,disponibilite,evaluation,image);
        return new ResponseEntity<>(articleDeMenu,HttpStatus.OK);
    }
    @DeleteMapping("admin/{id}")
    public ResponseEntity<String> deleteArticleMenu( @PathVariable("id") Long id){
        String deleteMsg= menuService.deleteArticleMenu(id);
        return new ResponseEntity<>(deleteMsg,HttpStatus.OK);
    }
    // Endpoints with Restaurant Staff role
    @PatchMapping("/restaurantstaff/{id}/disponibilite")
    public ResponseEntity<ArticleDeMenu> updateDisponibilite(@PathVariable("id") Long id, @RequestParam boolean nouvelleDisponibilite){
        ArticleDeMenu articleDeMenu = menuService.updateDisponibilite(id,nouvelleDisponibilite);
        return new ResponseEntity<>(articleDeMenu, HttpStatus.OK);
    }
    // Endpoints with User role
    @PatchMapping("/user/{id}/evaluation")
    public ResponseEntity<ArticleDeMenu> updateEvaluation(@PathVariable("id") Long id, @RequestParam Double nouvelleEvaluation) {
        ArticleDeMenu articleDeMenu = menuService.addEvaluation(id,nouvelleEvaluation);
        return new ResponseEntity<>(articleDeMenu, HttpStatus.OK);
    }
}