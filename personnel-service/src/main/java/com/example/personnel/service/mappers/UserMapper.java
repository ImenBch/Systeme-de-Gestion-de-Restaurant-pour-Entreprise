package com.example.personnel.service.mappers;

import com.example.personnel.service.dtos.UserDto;
import com.example.personnel.service.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface UserMapper {
    UserDto toDto (User user);
}