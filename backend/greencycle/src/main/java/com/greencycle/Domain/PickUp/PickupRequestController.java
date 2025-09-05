package com.greencycle.Domain.PickUp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.greencycle.Domain.User.SecurityServices.UserDetailsImpl;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pickup-requests")
public class PickupRequestController {

    @Autowired
    private PickupRequestService pickupRequestService;

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
    
    //  // Delivery partner api
    

    // 🔹 Delivery Partner: Accept a request
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

        if (!request.getStatus().equals("PENDING")) {
            return ResponseEntity.badRequest().build();
        }

        request.setAssignedTo(partnerId);
        request.setStatus("ASSIGNED");
        return ResponseEntity.ok(pickupRequestService.save(request));
    }



    // 🔹 Delivery Partner: Get all assigned requests for themselves
    @GetMapping("/assigned/{partnerId}")
    public List<PickupRequest> getAssignedRequests(@PathVariable Long partnerId) {
        return pickupRequestService.findByAssignedTo(partnerId);
    }
    
 
    @PutMapping("/{id}/complete")
    public ResponseEntity<PickupRequest> completeRequest(@PathVariable Long id) {
        return pickupRequestService.findById(id)
                .map(req -> {
                    req.setStatus("COMPLETED");
                    return ResponseEntity.ok(pickupRequestService.save(req));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/partner/{partnerId}")
    public List<PickupRequest> getAssignedToPartner(@PathVariable Long partnerId) {
        return pickupRequestService.findAll().stream()
                .filter(r -> partnerId.equals(r.getAssignedTo()))
                .toList();
    }

    @GetMapping("/user/{userId}")
    public List<PickupRequest> getForUser(@PathVariable Long userId) {
        return pickupRequestService.findAll().stream()
                .filter(r -> userId.equals(r.getUserId()))
                .toList();
    }

}
