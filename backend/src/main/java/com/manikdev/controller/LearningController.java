package com.manikdev.controller;

import com.manikdev.entity.Learning;
import com.manikdev.service.LearningService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning")
@CrossOrigin(origins = "http://localhost:5173")
public class LearningController {

    private final LearningService service;

    public LearningController(LearningService service) {
        this.service = service;
    }

    @GetMapping
    public List<Learning> getAllLearning() {
        return service.getAllLearning();
    }

    @PostMapping
    public Learning createLearning(@RequestBody Learning learning) {
        return service.createLearning(learning);
    }

    @PutMapping("/{id}")
    public Learning updateLearning(
            @PathVariable Long id,
            @RequestBody Learning learning) {

        return service.updateLearning(id, learning);
    }

    @DeleteMapping("/{id}")
    public String deleteLearning(@PathVariable Long id) {

        service.deleteLearning(id);

        return "Learning deleted successfully";
    }
}