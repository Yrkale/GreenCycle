package com.greencycle.config;

import com.greencycle.model.ERole; 
import com.greencycle.model.Role;
import com.greencycle.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleSeeder {

    @Bean
    CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            for (ERole role : ERole.values()) {
                if (!roleRepository.existsByName(role)) {
                    Role newRole = new Role(role);
                    roleRepository.save(newRole);
                    System.out.println("Role saved: " + role.name());
                }
            }
        };
    }
}
