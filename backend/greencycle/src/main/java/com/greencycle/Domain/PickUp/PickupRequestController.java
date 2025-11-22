package com.greencycle.Domain.PickUp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.greencycle.Domain.User.Model.User;
import com.greencycle.Domain.User.Repository.UserRepository;
import com.greencycle.Domain.User.Service.UserDetailsImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.greencycle.Domain.LiveContributor.Model.LiveContributor;
import com.greencycle.Domain.LiveContributor.Repository.LiveContributorRepository;

import java.time.LocalDateTime;



@RestController
@RequestMapping("/api/pickup-requests")
public class PickupRequestController {

    @Autowired
    private PickupRequestService pickupRequestService;

    @Autowired
    private PickupRequestRepository pickupRequestRepository;
    
    @Autowired
    private  UserRepository userRepository;
    
    // 🟢 NEW
    @Autowired
    private LiveContributorRepository liveContributorRepository;


    // 🔹 Get all pickup requests
    @GetMapping
    public List<PickupRequest> getAllPickupRequests() {
        return pickupRequestService.findAll();
    }

    // 🔹 Get single pickup request
    @GetMapping("/{id}")
    public ResponseEntity<PickupRequest> getPickupRequestById(@PathVariable Long id) {
        return pickupRequestService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Create a new pickup request
    @PostMapping
    public PickupRequest createPickupRequest(@RequestBody PickupRequestDTO dto,
                                             @AuthenticationPrincipal UserDetailsImpl userDetails) {
        dto.setUserId(userDetails.getId()); // ✅ force userId from logged-in user
        System.out.println("Received DTO with userId: " + dto.getUserId());
        return pickupRequestService.saveFromDTO(dto);
    }

    // 🔹 Delete pickup request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePickupRequest(@PathVariable Long id) {
        pickupRequestService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ===========================================================
    // ✅ DELIVERY PARTNER ENDPOINTS
    // ===========================================================

    // 🔹 Delivery Partner: Accept a request (generate OTP)
    @PutMapping("/{id}/accept")
    public ResponseEntity<PickupRequest> acceptRequest(
            @PathVariable Long id,
            @RequestParam Long partnerId
    ) {
        Optional<PickupRequest> optionalRequest = pickupRequestService.findById(id);

        if (optionalRequest.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        PickupRequest request = optionalRequest.get();

        if (!request.getStatus().equalsIgnoreCase("PENDING")) {
            return ResponseEntity.badRequest().build();
        }

        // ✅ Assign partner and generate OTP
        request.setAssignedTo(partnerId);
        request.setStatus("ASSIGNED");
        request.generateOtp(); // Generate 6-digit OTP

        pickupRequestService.save(request);

        return ResponseEntity.ok(request);
    }

    // 🔹 Delivery Partner: Get all assigned requests for themselves
    @GetMapping("/assigned/{partnerId}")
    public List<PickupRequest> getAssignedRequests(@PathVariable Long partnerId) {
        return pickupRequestService.findByAssignedTo(partnerId);
    }

    // 🔹 Complete request manually (fallback)
    @PutMapping("/{id}/complete")
    public ResponseEntity<PickupRequest> completeRequest(@PathVariable Long id) {
        return pickupRequestService.findById(id)
                .map(req -> {
                    req.setStatus("COMPLETED");
                    return ResponseEntity.ok(pickupRequestService.save(req));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Get all pickups assigned to a specific partner
    @GetMapping("/partner/{partnerId}")
    public List<PickupRequest> getAssignedToPartner(@PathVariable Long partnerId) {
        return pickupRequestService.findAll().stream()
                .filter(r -> partnerId.equals(r.getAssignedTo()))
                .toList();
    }

    // 🔹 Get all pickups for a specific user
    @GetMapping("/user/{userId}")
    public List<PickupRequest> getForUser(@PathVariable Long userId) {
        return pickupRequestService.findAll().stream()
                .filter(r -> userId.equals(r.getUserId()))
                .toList();
    }

    // 🔹 Partner stats (assigned, completed, pending)
    @GetMapping("/stats/{partnerId}")
    public Map<String, Long> getPartnerStats(@PathVariable Long partnerId) {
        long assigned = pickupRequestRepository.countByAssignedToAndStatus(partnerId, "ASSIGNED");
        long completed = pickupRequestRepository.countByAssignedToAndStatus(partnerId, "COMPLETED");
        long pending = pickupRequestRepository.countByStatus("PENDING");

        Map<String, Long> stats = new HashMap<>();
        stats.put("assigned", assigned);
        stats.put("completed", completed);
        stats.put("pending", pending);

        return stats;
    }

    // ===========================================================
    // ✅ VERIFY OTP ENDPOINT
    // ===========================================================
    @PostMapping("/{id}/verify-otp")
    public ResponseEntity<?> verifyOtp(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {

        String enteredOtp = payload.get("otp");
        Optional<PickupRequest> optionalRequest = pickupRequestService.findById(id);

        if (optionalRequest.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        PickupRequest request = optionalRequest.get();

        // ✅ Verify OTP
        if (request.getOtpCode() == null || !request.getOtpCode().equals(enteredOtp)) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "❌ Invalid OTP");
            return ResponseEntity.badRequest().body(response);
        }

        // ✅ Mark as completed
        request.setStatus("COMPLETED");

        // ✅ Calculate ecoPoints (sum of all item points)
        int totalPoints = request.getItems() != null
                ? request.getItems().stream().mapToInt(RecyclableItem::getPoints).sum()
                : 0;


        request.setEcoPoints(totalPoints);

        // ✅ Add EcoPoints to user's profile
        Long userId = request.getUserId(); // Assuming PickupRequest has userId field
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            int updatedPoints = (user.getEcoPoints() == null ? 0 : user.getEcoPoints()) + totalPoints;
            user.setEcoPoints(updatedPoints);
            user.setTillNowEcoPoints(updatedPoints);
            userRepository.save(user);
        }

        pickupRequestService.save(request);
        
        // 🟢 NEW: Store entry in LiveContributor
        LiveContributor contributor = new LiveContributor();
        contributor.setUserName(optionalUser.map(User::getUsername).orElse("Unknown"));
        contributor.setAction("completed a pickup");
        contributor.setReward("+" + totalPoints + " pts");
        contributor.setTime(LocalDateTime.now());
        liveContributorRepository.save(contributor);


        // ✅ Response payload
        Map<String, Object> response = new HashMap<>();
        response.put("message", "✅ Pickup verified and completed!");
        response.put("earnedPoints", totalPoints);
        response.put("totalUserPoints", optionalUser.map(User::getEcoPoints).orElse(totalPoints));

        return ResponseEntity.ok(response);
    }

}
