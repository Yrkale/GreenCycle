package com.greencycle.Domain.PickUp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pickup-requests")
public class PickupRequestController {

    @Autowired
    private PickupRequestService pickupRequestService;

    @GetMapping
    public List<PickupRequest> getAllPickupRequests() {
        return pickupRequestService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PickupRequest> getPickupRequestById(@PathVariable Long id) {
        return pickupRequestService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PickupRequest createPickupRequest(@RequestBody PickupRequest pickupRequest) {
        return pickupRequestService.save(pickupRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePickupRequest(@PathVariable Long id) {
        pickupRequestService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
