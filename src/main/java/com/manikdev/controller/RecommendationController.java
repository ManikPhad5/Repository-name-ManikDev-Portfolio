package com.manikdev.controller;

import com.manikdev.entity.Recommendation;
import com.manikdev.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:5173")
public class RecommendationController {

    private final RecommendationService service;

    public RecommendationController(
            RecommendationService service
    ) {
        this.service = service;
    }

    // ==========================================
    // PUBLIC - CREATE
    // ==========================================

    @PostMapping
    public Recommendation createRecommendation(
            @RequestBody Recommendation recommendation
    ) {
        return service.createRecommendation(
                recommendation
        );
    }

    // ==========================================
    // PUBLIC - GET ALL
    // ==========================================

    @GetMapping
    public List<Recommendation> getAllRecommendations() {
        return service.getAllRecommendations();
    }

    // ==========================================
    // ADMIN - DELETE
    // ==========================================

    @DeleteMapping("/{id}")
    public String deleteRecommendation(
            @PathVariable Long id
    ) {
        service.deleteRecommendation(id);

        return "Recommendation deleted successfully";
    }
}