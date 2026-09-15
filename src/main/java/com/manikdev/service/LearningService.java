package com.manikdev.service;

import com.manikdev.entity.Learning;
import com.manikdev.repository.LearningRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningService {

    private final LearningRepository repository;

    public LearningService(LearningRepository repository) {
        this.repository = repository;
    }

    public List<Learning> getAllLearning() {
        return repository.findAll();
    }

    public Learning createLearning(Learning learning) {
        return repository.save(learning);
    }

    public Learning updateLearning(Long id, Learning learning) {

        Learning existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Learning not found"));

        existing.setTitle(learning.getTitle());
        existing.setDescription(learning.getDescription());
        existing.setStatus(learning.getStatus());

        return repository.save(existing);
    }

    public void deleteLearning(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Learning not found");
        }

        repository.deleteById(id);
    }
}