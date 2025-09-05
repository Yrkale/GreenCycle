package com.greencycle.Domain.PickUp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickupRequestRepository extends JpaRepository<PickupRequest, Long> {
    List<PickupRequest> findByAssignedTo(Long partnerId);
    
    long countByAssignedToAndStatus(Long partnerId, String status);
    long countByStatus(String status);
}
