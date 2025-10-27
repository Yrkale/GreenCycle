package com.greencycle.Domain.PickUp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PickupRequestService {

    @Autowired
    private PickupRequestRepository pickupRequestRepository;

    @Autowired
    private RecyclableItemRepository recyclableItemRepository; // ✅ to fetch items

    public List<PickupRequest> findAll() {
        return pickupRequestRepository.findAll();
    }

    public Optional<PickupRequest> findById(Long id) {
        return pickupRequestRepository.findById(id);
    }

    public PickupRequest save(PickupRequest pickupRequest) {
        return pickupRequestRepository.save(pickupRequest);
    }

    // ✅ Save pickup request from DTO (with userId + itemIds)
    public PickupRequest saveFromDTO(PickupRequestDTO dto) {
        PickupRequest request = new PickupRequest();

        // Set simple fields
        request.setUserId(dto.getUserId());
        request.setPickupDate(dto.getPickupDate());
        request.setAddress(dto.getAddress());
        request.setCity(dto.getCity());
        request.setPostalCode(dto.getPostalCode());
        request.setDescription(dto.getDescription());

        // Handle items (ManyToMany join table)
        if (dto.getItemIds() != null && !dto.getItemIds().isEmpty()) {
            List<RecyclableItem> items = recyclableItemRepository.findAllById(dto.getItemIds());
            request.setItems(items);
        }

        // ✅ Generate OTP when pickup request is created
        request.generateOtp();

        // ✅ Initialize ecoPoints to 0 (safe default)
        request.setEcoPoints(0);

        // ✅ Set default status (keep consistent with your flow)
        request.setStatus("PENDING");

        return pickupRequestRepository.save(request);
    }

    public void deleteById(Long id) {
        pickupRequestRepository.deleteById(id);
    }

    public List<PickupRequest> findByAssignedTo(Long partnerId) {
        return pickupRequestRepository.findByAssignedTo(partnerId);
    }
}
