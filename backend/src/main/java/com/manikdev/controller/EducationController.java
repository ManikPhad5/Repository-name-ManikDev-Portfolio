package com.manikdev.controller;

import com.manikdev.entity.Education;
import com.manikdev.service.EducationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationController {

    private final EducationService service;

    public EducationController(EducationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Education> getAllEducation() {
        return service.getAllEducation();
    }

    @PostMapping
    public Education createEducation(@RequestBody Education education) {
        return service.createEducation(education);
    }

    @PutMapping("/{id}")
    public Education updateEducation(
            @PathVariable Long id,
            @RequestBody Education education) {

        return service.updateEducation(id, education);
    }

    @DeleteMapping("/{id}")
    public String deleteEducation(@PathVariable Long id) {

        service.deleteEducation(id);

        return "Education deleted successfully";
    }
}