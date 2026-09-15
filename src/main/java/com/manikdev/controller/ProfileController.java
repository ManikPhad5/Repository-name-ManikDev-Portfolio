package com.manikdev.controller;

import com.manikdev.entity.Profile;
import com.manikdev.service.ProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping
    public Profile getProfile() {
        return service.getProfile();
    }

    @PostMapping
    public Profile createProfile(@RequestBody Profile profile) {
        return service.createProfile(profile);
    }

    @PutMapping("/{id}")
    public Profile updateProfile(
            @PathVariable Long id,
            @RequestBody Profile profile) {

        return service.updateProfile(id, profile);
    }

    @PostMapping("/view")
    public String increaseView() {

        service.increaseView();

        return "Profile view counted";
    }
}