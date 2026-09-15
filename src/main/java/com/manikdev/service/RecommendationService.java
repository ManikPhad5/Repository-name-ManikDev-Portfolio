package com.manikdev.service;

import com.manikdev.entity.Recommendation;
import com.manikdev.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    private final RecommendationRepository repository;

    public RecommendationService(
            RecommendationRepository repository
    ) {
        this.repository = repository;
    }

    public Recommendation createRecommendation(
            Recommendation recommendation
    ) {
        return repository.save(recommendation);
    }

    public List<Recommendation> getAllRecommendations() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public void deleteRecommendation(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Recommendation not found"
            );
        }

        repository.deleteById(id);
    }
}