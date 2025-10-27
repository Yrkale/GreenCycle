package com.greencycle.Domain.Shop;

import com.greencycle.Domain.User.Repository.UserRepository;
import com.greencycle.Domain.User.SecurityServices.UserDetailsImpl;
import com.greencycle.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @Autowired
    private UserRepository userRepository;

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

    // ✅ Redeem a shop item (deduct eco points)
    @PostMapping("/redeem/{id}")
    public ResponseEntity<?> redeemShopItem(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        try {
            // 🔹 1. Verify user
            User user = userRepository.findById(userDetails.getId()).orElse(null);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("success", false, "message", "User not found"));
            }

            // 🔹 2. Get shop item
            Shop shop = shopService.getById(id);
            if (shop == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("success", false, "message", "Shop item not found"));
            }

            // 🔹 3. Check points
            if (user.getEcoPoints() < shop.getPointsCost()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("success", false, "message", "Not enough Eco Points to redeem this item"));
            }

            // 🔹 4. Deduct points
            user.setEcoPoints(user.getEcoPoints() - shop.getPointsCost());
            userRepository.save(user);

            // 🔹 5. (Optional) Log redemption (later you can add a RedemptionHistoryService here)

            // 🔹 6. Respond with success
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Redeemed successfully!",
                    "remainingEcoPoints", user.getEcoPoints()
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Redemption failed: " + e.getMessage()));
        }
    }

}
