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
    private RecyclableItemRepository recyclableItemRepository;

    public List<PickupRequest> findAll() {
        return pickupRequestRepository.findAll();
    }

    public Optional<PickupRequest> findById(Long id) {
        return pickupRequestRepository.findById(id);
    }

    public PickupRequest save(PickupRequest pickupRequest) {
        return pickupRequestRepository.save(pickupRequest);
    }

    // New method: save from DTO
    public PickupRequest saveFromDTO(PickupRequestDTO dto) {
        PickupRequest pickupRequest = new PickupRequest();
        pickupRequest.setUserId(dto.getUserId());
        pickupRequest.setPickupDate(dto.getPickupDate());
        pickupRequest.setAddress(dto.getAddress());
        pickupRequest.setCity(dto.getCity());
        pickupRequest.setPostalCode(dto.getPostalCode());
        pickupRequest.setDescription(dto.getDescription());

        // fetch items from DB
        if (dto.getItemIds() != null && !dto.getItemIds().isEmpty()) {
            List<RecyclableItem> items = recyclableItemRepository.findAllById(dto.getItemIds());
            pickupRequest.setItems(items);
        }

        return pickupRequestRepository.save(pickupRequest);
    }

    public void deleteById(Long id) {
        pickupRequestRepository.deleteById(id);
    }
}
