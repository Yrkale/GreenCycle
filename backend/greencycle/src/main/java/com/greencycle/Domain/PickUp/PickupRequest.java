package com.greencycle.Domain.PickUp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pickups")
public class PickupRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private LocalDateTime pickupDate;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String city;
    private String postalCode;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String status = "PENDING";

    private Long assignedTo;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Link with recyclable items
    @ManyToMany
    @JoinTable(
        name = "pickup_request_items",
        joinColumns = @JoinColumn(name = "pickup_request_id"),
        inverseJoinColumns = @JoinColumn(name = "item_id")
    )
    private List<RecyclableItem> items;

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDateTime getPickupDate() { return pickupDate; }
    public void setPickupDate(LocalDateTime pickupDate) { this.pickupDate = pickupDate; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getAssignedTo() { return assignedTo; }
    public void setAssignedTo(Long assignedTo) { this.assignedTo = assignedTo; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<RecyclableItem> getItems() { return items; }
    public void setItems(List<RecyclableItem> items) { this.items = items; }
}
