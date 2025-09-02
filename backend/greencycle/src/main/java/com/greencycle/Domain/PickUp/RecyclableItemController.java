package com.greencycle.Domain.PickUp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;


import java.net.URI;
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
    public ResponseEntity<RecyclableItem> createItem(@RequestBody RecyclableItem item) {
        RecyclableItem savedItem = recyclableItemRepository.save(item);
        return ResponseEntity.created(URI.create("/api/recyclable-items/" + savedItem.getId()))
                             .body(savedItem);
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

 // DELETE by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        return recyclableItemRepository.findById(id)
                .map(item -> {
                    recyclableItemRepository.delete(item);
                    return ResponseEntity.noContent().<Void>build(); // ✅ enforce Void
                })
                .orElseGet(() -> ResponseEntity.notFound().<Void>build()); // ✅ enforce Void
    }



}
