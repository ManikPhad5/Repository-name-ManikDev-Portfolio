package com.manikdev.service;

import com.manikdev.entity.Achievement;
import com.manikdev.repository.AchievementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementService {

    private final AchievementRepository repository;

    public AchievementService(AchievementRepository repository) {
        this.repository = repository;
    }

    public List<Achievement> getAllAchievements() {
        return repository.findAll();
    }

    public Achievement createAchievement(Achievement achievement) {
        return repository.save(achievement);
    }

    public Achievement updateAchievement(Long id, Achievement achievement) {

        Achievement existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found"));

        existing.setLabel(achievement.getLabel());
        existing.setYear(achievement.getYear());

        return repository.save(existing);
    }

    public void deleteAchievement(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Achievement not found");
        }

        repository.deleteById(id);
    }
}