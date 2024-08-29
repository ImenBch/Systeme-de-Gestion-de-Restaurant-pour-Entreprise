package com.example.personnel.service.service;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakConfig {

    private static final String SERVER_URL = "http://localhost:8180";
    private static final String REALM = "SpringBootKeycloak";

    @Bean
    Keycloak keycloak() {
        return KeycloakBuilder.builder()
                .serverUrl(SERVER_URL)
                .realm(REALM)
                .clientId("keycloak-admin")
                .clientSecret("DtLcOANLNoeSRpaing0YToANWXkaWrFA")
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .build();
    }
}