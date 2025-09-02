package com.greencycle.Domain.PickUp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public PickupRequest createPickupRequest(@RequestBody PickupRequestDTO dto) {
        return pickupRequestService.saveFromDTO(dto);
    }

    // 🔹 Delete pickup request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePickupRequest(@PathVariable Long id) {
        pickupRequestService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

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
}
