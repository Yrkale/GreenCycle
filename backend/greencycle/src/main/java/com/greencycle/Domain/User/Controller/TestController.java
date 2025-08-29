package com.greencycle.Domain.User.Controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestController {

    // Public endpoint (no token needed)
    @GetMapping("/public")
    public String publicAccess() {
        return "✅ Public Content - anyone can see this.";
    }

    // Protected endpoint (token required)
    @GetMapping("/user")
    public String userAccess() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return "🔒 Hello, " + auth.getName() + "! You have accessed a USER protected resource.";
    }

    // Another protected endpoint
    @GetMapping("/admin")
    public String adminAccess() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return "👑 Admin Zone - Welcome " + auth.getName();
    }
}
