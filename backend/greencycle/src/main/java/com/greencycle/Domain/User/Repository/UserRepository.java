package com.greencycle.Domain.User.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greencycle.Domain.User.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);  // ✅ This is needed
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
  
    long countByRole(String role);
    List<User> findByRole(String role);

    
    List<User> findTop10ByOrderByTillNowEcoPointsDesc();
    
}
