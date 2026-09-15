package com.manikdev.dto;

public class DashboardSummary {

    private long skills;
    private long projects;
    private long experience;
    private long certificates;
    private int dsaProblems;
    private long profileViews;

    public DashboardSummary() {
    }

    public DashboardSummary(long skills,
                            long projects,
                            long experience,
                            long certificates,
                            int dsaProblems,
                            long profileViews) {
        this.skills = skills;
        this.projects = projects;
        this.experience = experience;
        this.certificates = certificates;
        this.dsaProblems = dsaProblems;
        this.profileViews = profileViews;
    }

    public long getSkills() {
        return skills;
    }

    public void setSkills(long skills) {
        this.skills = skills;
    }

    public long getProjects() {
        return projects;
    }

    public void setProjects(long projects) {
        this.projects = projects;
    }

    public long getExperience() {
        return experience;
    }

    public void setExperience(long experience) {
        this.experience = experience;
    }

    public long getCertificates() {
        return certificates;
    }

    public void setCertificates(long certificates) {
        this.certificates = certificates;
    }

    public int getDsaProblems() {
        return dsaProblems;
    }

    public void setDsaProblems(int dsaProblems) {
        this.dsaProblems = dsaProblems;
    }

    public long getProfileViews() {
        return profileViews;
    }

    public void setProfileViews(long profileViews) {
        this.profileViews = profileViews;
    }
}