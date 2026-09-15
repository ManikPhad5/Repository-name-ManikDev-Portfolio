package com.manikdev.service;

import com.manikdev.entity.Experience;
import com.manikdev.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository repository;

    public ExperienceService(ExperienceRepository repository) {
        this.repository = repository;
    }

    public List<Experience> getAllExperience() {
        return repository.findAll();
    }

    public Experience createExperience(Experience experience) {
        return repository.save(experience);
    }

    public Experience updateExperience(Long id, Experience experience) {

        Experience existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Experience not found"));

        existing.setRole(experience.getRole());
        existing.setCompany(experience.getCompany());
        existing.setPeriod(experience.getPeriod());
        existing.setBullets(experience.getBullets());

        return repository.save(existing);
    }

    public void deleteExperience(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Experience not found");
        }

        repository.deleteById(id);
    }
}