package com.greencycle.Domain.Shop.Redem;

 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greencycle.Domain.Shop.Shop;
import com.greencycle.Domain.Shop.ShopRepository;
 
import com.greencycle.Domain.User.Repository.UserRepository;
import com.greencycle.model.User;

import java.util.List;

@Service
public class RedemptionService {

    @Autowired
    private RedemptionRepository redemptionRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private UserRepository userRepository;

    public String redeemItem(Long shopId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        if (user.getEcoPoints() < shop.getPointsCost()) {
            throw new RuntimeException("Not enough Eco Points");
        }

        user.setEcoPoints(user.getEcoPoints() - shop.getPointsCost());
        userRepository.save(user);

        Redemption redemption = new Redemption();
        redemption.setUser(user);   // ✅ critical
        redemption.setShop(shop);   // ✅ critical
        redemptionRepository.save(redemption);

        return "Redeemed successfully!";
    }

//    public List<RedemptionDTO> getUserRedemptions(Long userId) {
//        List<Redemption> redemptions = redemptionRepository.findByUserId(userId);
//        return redemptions.stream()
//                .map(r -> new RedemptionDTO(
//                        r.getId(),
//                        r.getShop() != null ? r.getShop().getName() : "Unknown",
//                        r.getShop() != null ? r.getShop().getPointsCost() : 0,
//                        r.getRedeemedAt()
//                ))
//                .toList();
//    }

}
