package com.greencycle.Domain.Shop.Redem;

 

import java.time.LocalDateTime;

/**
 * Lightweight DTO returned to frontend so we don't serialize whole JPA graph.
 */
public class RedemptionDTO {
    private Long id;
    private Long shopId;
    private String shopName;
    private Integer pointsUsed;
    private LocalDateTime redeemedAt;
    private String imageUrl; // optional, useful for UI

    public RedemptionDTO() {}

    public RedemptionDTO(Long id, Long shopId, String shopName, Integer pointsUsed, LocalDateTime redeemedAt, String imageUrl) {
        this.id = id;
        this.shopId = shopId;
        this.shopName = shopName;
        this.pointsUsed = pointsUsed;
        this.redeemedAt = redeemedAt;
        this.imageUrl = imageUrl;
    }

    // Getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getShopId() { return shopId; }
    public void setShopId(Long shopId) { this.shopId = shopId; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public Integer getPointsUsed() { return pointsUsed; }
    public void setPointsUsed(Integer pointsUsed) { this.pointsUsed = pointsUsed; }

    public LocalDateTime getRedeemedAt() { return redeemedAt; }
    public void setRedeemedAt(LocalDateTime redeemedAt) { this.redeemedAt = redeemedAt; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
