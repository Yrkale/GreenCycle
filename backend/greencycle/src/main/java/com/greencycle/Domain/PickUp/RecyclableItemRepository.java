package com.greencycle.Domain.PickUp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecyclableItemRepository extends JpaRepository<RecyclableItem, Long> {
}
