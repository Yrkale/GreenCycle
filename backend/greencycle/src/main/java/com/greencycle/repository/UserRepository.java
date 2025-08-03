package com.greencycle.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.greencycle.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);  // ✅ This is needed
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
