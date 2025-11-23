package com.greencycle.Domain.User.Controller;

import com.greencycle.Domain.User.Model.User;
import com.greencycle.Domain.User.Repository.UserRepository;
import com.greencycle.Domain.User.Service.UserDetailsImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    @GetMapping("/me")
    public UserDetailsImpl getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return userDetails;
    }

    // ============================================================
    // ✅ NEW PROFILE ENDPOINT FOR FRONTEND PROFILE PAGE
    // ============================================================
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Optional<User> optionalUser = userRepository.findById(userDetails.getId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("ecoPoints", user.getEcoPoints());

        return ResponseEntity.ok(response);
    }

    // ============================================================
    // ✅ CHANGE PASSWORD ENDPOINT
    // ============================================================
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody Map<String, String> passwordRequest) {

        String oldPassword = passwordRequest.get("oldPassword");
        String newPassword = passwordRequest.get("newPassword");

        Optional<User> optionalUser = userRepository.findById(userDetails.getId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();

        // ❌ Invalid old password
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "❌ Incorrect current password!");
            return ResponseEntity.badRequest().body(response);
        }

        // ✅ Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "✅ Password changed successfully!");
        return ResponseEntity.ok(response);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    
    
    
    @GetMapping("/top-contributors")
    public List<User> getTopContributors() {
        return userRepository.findTop10ByOrderByTillNowEcoPointsDesc();
    }
    
    
    
    
    
}
