package com.manikdev.service;

import com.manikdev.dto.DashboardSummary;
import com.manikdev.entity.Profile;
import com.manikdev.repository.*;

import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final CertificateRepository certificateRepository;
    private final ProfileRepository profileRepository;

    public DashboardService(
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            CertificateRepository certificateRepository,
            ProfileRepository profileRepository) {

        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.certificateRepository = certificateRepository;
        this.profileRepository = profileRepository;
    }

    public DashboardSummary getSummary() {

        long skills = skillRepository.count();
        long projects = projectRepository.count();
        long experience = experienceRepository.count();
        long certificates = certificateRepository.count();

        int dsaProblems = 0;
        long profileViews = 0;

        Profile profile = profileRepository
                .findAll()
                .stream()
                .findFirst()
                .orElse(null);

        if (profile != null) {
            dsaProblems = profile.getDsaProblems();
            profileViews = profile.getProfileViews();
        }

        return new DashboardSummary(
                skills,
                projects,
                experience,
                certificates,
                dsaProblems,
                profileViews
        );
    }
}