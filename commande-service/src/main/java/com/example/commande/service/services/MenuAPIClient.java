package com.example.commande.service.services;

import com.example.commande.service.dtos.ArticleDeMenuDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="menu-service")
public interface MenuAPIClient {
    @GetMapping("/menu/{id}")
    ArticleDeMenuDto getArticleMenuById(@PathVariable("id") String id);
}