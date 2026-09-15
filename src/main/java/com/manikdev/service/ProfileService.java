package com.manikdev.service;

import com.manikdev.entity.Profile;
import com.manikdev.repository.ProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository repository;

    public ProfileService(ProfileRepository repository) {
        this.repository = repository;
    }

    public Profile getProfile() {
        return repository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }

    public Profile createProfile(Profile profile) {
        return repository.save(profile);
    }

    public Profile updateProfile(Long id, Profile profile) {

        Profile existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        existing.setName(profile.getName());
        existing.setTitle(profile.getTitle());
        existing.setEmail(profile.getEmail());
        existing.setPhone(profile.getPhone());
        existing.setLocation(profile.getLocation());
        existing.setAbout(profile.getAbout());
        existing.setGithubUrl(profile.getGithubUrl());
        existing.setLinkedinUrl(profile.getLinkedinUrl());
        existing.setResumeUrl(profile.getResumeUrl());
        existing.setProfileImageUrl(profile.getProfileImageUrl());
        existing.setOpenToOpportunities(profile.isOpenToOpportunities());
        existing.setDsaProblems(profile.getDsaProblems());

        return repository.save(existing);
    }

    public void increaseView() {

        Profile profile = getProfile();

        if (profile == null) {
            throw new RuntimeException("Profile not found");
        }

        profile.setProfileViews(profile.getProfileViews() + 1);

        repository.save(profile);
    }
}