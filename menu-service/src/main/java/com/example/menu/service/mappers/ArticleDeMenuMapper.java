package com.example.menu.service.mappers;

import com.example.menu.service.dtos.ArticleDeMenuDto;
import com.example.menu.service.models.ArticleDeMenu;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ArticleDeMenuMapper {
    ArticleDeMenu fromDto(ArticleDeMenuDto articleDeMenuDto);
    void fromDto(ArticleDeMenuDto dto, @MappingTarget ArticleDeMenu entity);

}