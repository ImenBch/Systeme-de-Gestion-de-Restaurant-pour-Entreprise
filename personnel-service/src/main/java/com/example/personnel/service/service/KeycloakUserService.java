package com.example.personnel.service.service;

import com.example.personnel.service.dtos.CommandePersonnelDto;
import com.example.personnel.service.dtos.UserDto;
import com.example.personnel.service.mappers.UserMapper;
import com.example.personnel.service.models.User;
import com.example.personnel.service.repository.UserRepository;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KeycloakUserService {

    @Autowired
    Keycloak keycloak;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserMapper userMapper;
    @Autowired
    CommandeAPIClient commandeAPIClient;

    public List<User> saveUsers(){
        List<User> users = keycloak.realm( "SpringBootKeycloak")
                .users()
                .list()
                .stream()
                .map( userRepresentation -> new User(userRepresentation.getId(), userRepresentation.getFirstName(),userRepresentation.getLastName(),userRepresentation.getEmail()) )
                .collect(Collectors.toList());
        return userRepository.saveAll(users);
    }
    public User saveUser(String userId){
        UserRepresentation  userRepresentation= keycloak.realm("SpringBootKeycloak")
                .users()
                .get(userId)
                .toRepresentation();
        User newUser = new User(userRepresentation.getId(), userRepresentation.getFirstName(), userRepresentation.getLastName(),userRepresentation.getEmail());
        return  userRepository.save(newUser);
    }
    public UserDto getUserById(String userId) {
        User user = userRepository.findById(userId).orElse(saveUser(userId));
        return userMapper.toDto(user);
    }
    public List<CommandePersonnelDto>  getHistoriqueCommande(String userId){
        if(!userRepository.existsById(userId)){
           saveUser(userId);
        }
        return commandeAPIClient.getHistoriqueCommandeById(userId);
    }
}