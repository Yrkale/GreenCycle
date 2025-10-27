package com.greencycle.Domain.Shop;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

    public List<Shop> listAll() {
        return shopRepository.findAll();
    }

    public Shop getById(Long id) {
        return shopRepository.findById(id).orElse(null);
    }

    public Shop create(Shop s) {
        return shopRepository.save(s);
    }

    public void delete(Long id) {
        shopRepository.deleteById(id);
    }
}
