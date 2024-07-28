package com.example.personnel.service.mappers;

import com.example.personnel.service.dtos.PersonnelDto;
import com.example.personnel.service.models.Personnel;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "Spring")
public interface PersonnelMapper {
    void fromDto(PersonnelDto personnelDto, @MappingTarget Personnel personnel);
    Personnel fromDto(PersonnelDto personnelDto);
}