package com.greencycle.Domain.Admin.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greencycle.Domain.PickUp.PickupRequestRepository;
import com.greencycle.Domain.User.Repository.UserRepository;
//import com.greencycle.model.ERole;

 

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PickupRequestRepository pickupRepo;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalUsers", userRepo.count());

        // ✅ Count delivery partners by role name (no Role entity needed)
        stats.put("totalPartners", userRepo.countByRole("DELIVERY_PARTNER"));

        stats.put("totalPickups", pickupRepo.count());
        stats.put("pending", pickupRepo.countByStatus("PENDING"));
        stats.put("assigned", pickupRepo.countByStatus("ASSIGNED"));
        stats.put("completed", pickupRepo.countByStatus("COMPLETED"));

        return stats;
    }
}
