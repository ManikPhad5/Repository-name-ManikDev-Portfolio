package com.manikdev.service;

import com.manikdev.entity.Skill;
import com.manikdev.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository repository;

    public SkillService(SkillRepository repository) {
        this.repository = repository;
    }

    public List<Skill> getAllSkills() {
        return repository.findAll();
    }

    public Skill createSkill(Skill skill) {
        return repository.save(skill);
    }

    public Skill updateSkill(Long id, Skill skill) {

        Skill existingSkill = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        existingSkill.setName(skill.getName());
        existingSkill.setCategory(skill.getCategory());

        return repository.save(existingSkill);
    }

    public void deleteSkill(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Skill not found");
        }

        repository.deleteById(id);
    }
}