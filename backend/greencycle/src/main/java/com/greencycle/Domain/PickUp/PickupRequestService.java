package com.greencycle.Domain.PickUp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PickupRequestService {

    @Autowired
    private PickupRequestRepository pickupRequestRepository;

    public List<PickupRequest> findAll() {
        return pickupRequestRepository.findAll();
    }

    public Optional<PickupRequest> findById(Long id) {
        return pickupRequestRepository.findById(id);
    }

    public PickupRequest save(PickupRequest pickupRequest) {
        return pickupRequestRepository.save(pickupRequest);
    }

    public void deleteById(Long id) {
        pickupRequestRepository.deleteById(id);
    }
}
