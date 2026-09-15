package com.manikdev.controller;

import com.manikdev.entity.Experience;
import com.manikdev.service.ExperienceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = "http://localhost:5173")
public class ExperienceController {

    private final ExperienceService service;

    public ExperienceController(ExperienceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Experience> getAllExperience() {
        return service.getAllExperience();
    }

    @PostMapping
    public Experience createExperience(@RequestBody Experience experience) {
        return service.createExperience(experience);
    }

    @PutMapping("/{id}")
    public Experience updateExperience(
            @PathVariable Long id,
            @RequestBody Experience experience) {

        return service.updateExperience(id, experience);
    }

    @DeleteMapping("/{id}")
    public String deleteExperience(@PathVariable Long id) {

        service.deleteExperience(id);

        return "Experience deleted successfully";
    }
}