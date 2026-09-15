package com.manikdev.service;

import com.manikdev.entity.Education;
import com.manikdev.repository.EducationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    private final EducationRepository repository;

    public EducationService(EducationRepository repository) {
        this.repository = repository;
    }

    public List<Education> getAllEducation() {
        return repository.findAll();
    }

    public Education createEducation(Education education) {
        return repository.save(education);
    }

    public Education updateEducation(Long id, Education education) {

        Education existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found"));

        existing.setDegree(education.getDegree());
        existing.setSchool(education.getSchool());
        existing.setPeriod(education.getPeriod());
        existing.setCgpa(education.getCgpa());

        return repository.save(existing);
    }

    public void deleteEducation(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Education not found");
        }

        repository.deleteById(id);
    }
}