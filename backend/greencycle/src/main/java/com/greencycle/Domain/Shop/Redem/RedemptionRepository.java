package com.greencycle.Domain.Shop.Redem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

 

public interface RedemptionRepository extends JpaRepository<Redemption, Long> {
    List<Redemption> findByUserId(Long userId);
}
