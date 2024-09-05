package com.example.cloud_gateway.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.core.GrantedAuthorityDefaults;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain resourceServerFilterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        KeycloakJwtRolesConverter keycloakJwtRolesConverter = new KeycloakJwtRolesConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(keycloakJwtRolesConverter);
        http.cors(Customizer.withDefaults());
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/menu/admin/**","personnel/admin/**").hasRole("admin")

                .requestMatchers("/commandes/user-restaurantstaff/**","/users/**").hasAnyRole("user","restaurantStaff")
                .requestMatchers(("/commandes/admin-restaurantstaff/**")).hasAnyRole("admin","restaurantStaff")

                .requestMatchers("/menu/restaurantstaff/**","/commandes/restaurantstaff/**").hasRole("restaurantStaff")
                .requestMatchers("/menu/user/**").hasRole("user")

                .requestMatchers("/menu","/menu/*","/images/*").permitAll()
                .anyRequest().authenticated());
        http.oauth2ResourceServer((oauth2) -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter)));
        return http.build();
    }
    @Bean
    GrantedAuthorityDefaults grantedAuthorityDefaults() {
        return new GrantedAuthorityDefaults(""); // role prefix: remove "Role_" with hasRole()
    }
    // configuration du cors
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        final CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:4200");
        corsConfig.addAllowedMethod("*");
        corsConfig.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfig);
        return source;
    }
}