package com.greencycle.Domain.Shop;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> listAll() 
    { return productRepository.findAll(); }
    
    public Product getById(Long id) 
    { return productRepository.findById(id).orElse(null); }
    
    public Product create(Product p) 
    { return productRepository.save(p); }
    
    public void delete(Long id) 
    { productRepository.deleteById(id); }
}
