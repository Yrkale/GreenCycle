package com.greencycle.Domain.Shop.Redem;

 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.greencycle.Domain.Shop.Shop;
import com.greencycle.Domain.Shop.ShopService;
import com.greencycle.Domain.User.Repository.UserRepository;
import com.greencycle.Domain.User.SecurityServices.UserDetailsImpl;
import com.greencycle.model.User;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/redemption")
@CrossOrigin(origins = "http://localhost:3000")
public class RedemptionController {

    @Autowired
    private RedemptionRepository redemptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShopService shopService;

    // ✅ POST: Redeem an item
    @PostMapping("/redeem/{shopId}")
    public ResponseEntity<?> redeemShopItem(
            @PathVariable Long shopId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        try {
            // 1️⃣ Get the logged-in user
            User user = userRepository.findById(userDetails.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 2️⃣ Get the shop item
            Shop shop = shopService.getById(shopId);
            if (shop == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Shop item not found");
            }

            // 3️⃣ Check points
            if (user.getEcoPoints() < shop.getPointsCost()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Not enough Eco Points to redeem this item");
            }

            // 4️⃣ Deduct points
            user.setEcoPoints(user.getEcoPoints() - shop.getPointsCost());
            userRepository.save(user);

            // 5️⃣ Save redemption record
            Redemption redemption = new Redemption(user, shop);
            redemptionRepository.save(redemption);

            return ResponseEntity.ok("Redeemed successfully!");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Redemption failed: " + e.getMessage());
        }
    }

    // ✅ GET: List all redeemed items for current user
    @GetMapping("/my")
    public ResponseEntity<List<RedemptionDTO>> getUserRedemptions(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            Long userId = userDetails.getId();

            // fetch Redemption entities (existing repository method)
            List<Redemption> redemptions = redemptionRepository.findByUserId(userId);

            // map to DTOs (safe, no entity graph serialization)
            List<RedemptionDTO> dtos = redemptions.stream().map(r -> {
                // defensive null checks for shop
                Long shopId = null;
                String shopName = null;
                Integer pointsUsed = null;
                String imageUrl = null;

                if (r.getShop() != null) {
                    shopId = r.getShop().getId();
                    shopName = r.getShop().getName();
                    pointsUsed = r.getShop().getPointsCost();
                    imageUrl = r.getShop().getImageUrl();
                }

                return new RedemptionDTO(
                        r.getId(),
                        shopId,
                        shopName,
                        pointsUsed,
                        r.getRedeemedAt(),
                        imageUrl
                );
            }).collect(Collectors.toList());

            return ResponseEntity.ok(dtos);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
