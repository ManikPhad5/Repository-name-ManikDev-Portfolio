package com.manikdev.repository;

import com.manikdev.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendationRepository
        extends JpaRepository<Recommendation, Long> {

    List<Recommendation> findAllByOrderByCreatedAtDesc();
}