package com.greencycle.Domain.LiveContributor;

 
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/live-contributors")
@CrossOrigin(origins = "*")
public class LiveContributorController {

    private final LiveContributorService service;

    public LiveContributorController(LiveContributorService service) {
        this.service = service;
    }

    // ✅ GET all contributors
    @GetMapping
    public List<LiveContributor> getAllContributors() {
        return service.getAllContributors();
    }

    // ✅ POST new contribution (for live updates)
    @PostMapping
    public LiveContributor addContributor(@RequestBody LiveContributor contributor) {
        return service.addContributor(contributor);
    }

    // ✅ DELETE by ID (optional for admin cleanup)
    @DeleteMapping("/{id}")
    public void deleteContributor(@PathVariable Long id) {
        service.deleteContributor(id);
    }
}
