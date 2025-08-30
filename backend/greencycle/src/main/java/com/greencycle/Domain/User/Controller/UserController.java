package com.greencycle.Domain.User.Controller;

import com.greencycle.Domain.User.SecurityServices.UserDetailsImpl;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public UserDetailsImpl getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return userDetails;  // ✅ returns logged in user info
    }
}
