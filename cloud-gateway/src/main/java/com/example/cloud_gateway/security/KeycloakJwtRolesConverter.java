package com.example.cloud_gateway.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class KeycloakJwtRolesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    private static final String CLAIM_REALM_ACCESS = "realm_access";
    private static final String CLAIM_ROLES = "roles";
    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Collection<String>> realmAccess = jwt.getClaim(CLAIM_REALM_ACCESS);
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        if (realmAccess!= null && !realmAccess.isEmpty()){
            Collection<String> realmRole= realmAccess.get(CLAIM_ROLES);
            if(realmRole !=null && !realmRole.isEmpty()){
                realmRole.forEach(r-> {
                    grantedAuthorities.add(new SimpleGrantedAuthority(r));
                });
            }
        }
        return grantedAuthorities;
    }
}