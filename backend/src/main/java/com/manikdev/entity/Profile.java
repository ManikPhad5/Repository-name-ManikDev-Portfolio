package com.manikdev.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String title;
    private String email;
    private String phone;
    private String location;

    @Column(length = 2000)
    private String about;

    private String githubUrl;
    private String linkedinUrl;
    private String resumeUrl;
    private String profileImageUrl;

    private boolean openToOpportunities;
    private long profileViews;
    private int dsaProblems;

    public Profile() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public boolean isOpenToOpportunities() {
        return openToOpportunities;
    }

    public void setOpenToOpportunities(boolean openToOpportunities) {
        this.openToOpportunities = openToOpportunities;
    }

    public long getProfileViews() {
        return profileViews;
    }

    public void setProfileViews(long profileViews) {
        this.profileViews = profileViews;
    }

    public int getDsaProblems() {
        return dsaProblems;
    }

    public void setDsaProblems(int dsaProblems) {
        this.dsaProblems = dsaProblems;
    }
}