package com.greencycle.Domain.Shop;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    @Autowired
    private ShopService shopService;

    // ✅ Get all shop items
    @GetMapping
    public ResponseEntity<List<Shop>> list() {
        return ResponseEntity.ok(shopService.listAll());
    }

    // ✅ Get single shop item
    @GetMapping("/{id}")
    public ResponseEntity<Shop> get(@PathVariable Long id) {
        Shop s = shopService.getById(id);
        if (s == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(s);
    }

    // ✅ Create a new shop item
    @PostMapping
    public ResponseEntity<Shop> create(@RequestBody Shop shop) {
        Shop saved = shopService.create(shop);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
