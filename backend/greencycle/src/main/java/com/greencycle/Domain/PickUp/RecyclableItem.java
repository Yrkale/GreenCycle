package com.greencycle.Domain.PickUp;

import javax.persistence.*;

@Entity
@Table(name = "recyclable_items")
public class RecyclableItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;       // e.g. "Plastic Bottles"
    private String description; // e.g. "PET bottles, soda bottles"
    private int points;         // eco-points for pickup

    // Constructors
    public RecyclableItem() {}

    public RecyclableItem(String title, String description, int points) {
        this.title = title;
        this.description = description;
        this.points = points;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }
}
