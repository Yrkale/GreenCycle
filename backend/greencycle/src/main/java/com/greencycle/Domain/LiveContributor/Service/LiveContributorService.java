package com.greencycle.Domain.LiveContributor.Service;

 
import org.springframework.stereotype.Service;

import com.greencycle.Domain.LiveContributor.Model.LiveContributor;
import com.greencycle.Domain.LiveContributor.Repository.LiveContributorRepository;

import java.util.List;

@Service
public class LiveContributorService {

    private final LiveContributorRepository repository;

    public LiveContributorService(LiveContributorRepository repository) {
        this.repository = repository;
    }

    public List<LiveContributor> getAllContributors() {
    	 return repository.findAllByOrderByTimeDesc();
    }

    public LiveContributor addContributor(LiveContributor contributor) {
    	 if (contributor.getTime() == null) {              // ✅ NEW LINE
             contributor.setTime(java.time.LocalDateTime.now()); // ✅ NEW LINE
         }
        return repository.save(contributor);
    }

    public void deleteContributor(Long id) {
        repository.deleteById(id);
    }
}
