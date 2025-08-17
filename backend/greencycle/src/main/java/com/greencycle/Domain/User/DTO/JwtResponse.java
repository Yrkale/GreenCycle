package com.greencycle.Domain.User.DTO;

import java.util.List;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    // Updated constructor to accept Collection<? extends GrantedAuthority>
    public JwtResponse(String token, Long id, String username, String email,
                       Collection<? extends GrantedAuthority> authorities) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = authorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList());
    }

    // Getters and Setters

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
