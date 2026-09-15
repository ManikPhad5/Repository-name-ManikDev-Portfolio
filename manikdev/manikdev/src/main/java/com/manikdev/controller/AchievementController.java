package com.manikdev.controller;

import com.manikdev.entity.Achievement;
import com.manikdev.service.AchievementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:5173")
public class AchievementController {

    private final AchievementService service;

    public AchievementController(AchievementService service) {
        this.service = service;
    }

    @GetMapping
    public List<Achievement> getAllAchievements() {
        return service.getAllAchievements();
    }

    @PostMapping
    public Achievement createAchievement(
            @RequestBody Achievement achievement) {

        return service.createAchievement(achievement);
    }

    @PutMapping("/{id}")
    public Achievement updateAchievement(
            @PathVariable Long id,
            @RequestBody Achievement achievement) {

        return service.updateAchievement(id, achievement);
    }

    @DeleteMapping("/{id}")
    public String deleteAchievement(@PathVariable Long id) {

        service.deleteAchievement(id);

        return "Achievement deleted successfully";
    }
}