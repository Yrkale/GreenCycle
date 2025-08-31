package com.greencycle.Domain.PickUp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recyclable-items")
public class RecyclableItemController {

    @Autowired
    private RecyclableItemRepository recyclableItemRepository;

    // GET all
    @GetMapping
    public List<RecyclableItem> getAllItems() {
        return recyclableItemRepository.findAll();
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<RecyclableItem> getItemById(@PathVariable Long id) {
        return recyclableItemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST (create new item)
    @PostMapping
    public RecyclableItem createItem(@RequestBody RecyclableItem item) {
        return recyclableItemRepository.save(item);
    }

    // PUT (update existing item)
    @PutMapping("/{id}")
    public ResponseEntity<RecyclableItem> updateItem(
            @PathVariable Long id,
            @RequestBody RecyclableItem itemDetails) {

        return recyclableItemRepository.findById(id)
                .map(item -> {
                    item.setTitle(itemDetails.getTitle());
                    item.setDescription(itemDetails.getDescription());
                    item.setPoints(itemDetails.getPoints());
                    return ResponseEntity.ok(recyclableItemRepository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }


}
