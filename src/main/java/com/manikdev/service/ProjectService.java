package com.manikdev.service;

import com.manikdev.entity.Project;
import com.manikdev.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Project createProject(Project project) {
        return repository.save(project);
    }

    public Project updateProject(Long id, Project project) {

        Project existingProject = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        existingProject.setTitle(project.getTitle());
        existingProject.setDescription(project.getDescription());
        existingProject.setTags(project.getTags());
        existingProject.setFeatured(project.getFeatured());
        existingProject.setGithubUrl(project.getGithubUrl());
        existingProject.setDemoUrl(project.getDemoUrl());
        existingProject.setImage(project.getImage());

        return repository.save(existingProject);
    }

    public void deleteProject(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Project not found");
        }

        repository.deleteById(id);
    }
}