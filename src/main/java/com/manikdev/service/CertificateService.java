package com.manikdev.service;

import com.manikdev.entity.Certificate;
import com.manikdev.repository.CertificateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateService {

    private final CertificateRepository repository;

    public CertificateService(CertificateRepository repository) {
        this.repository = repository;
    }

    public List<Certificate> getAllCertificates() {
        return repository.findAll();
    }

    public Certificate createCertificate(Certificate certificate) {
        return repository.save(certificate);
    }

    public Certificate updateCertificate(Long id, Certificate certificate) {

        Certificate existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        existing.setName(certificate.getName());
        existing.setIssuer(certificate.getIssuer());
        existing.setDate(certificate.getDate());
        existing.setUrl(certificate.getUrl());

        return repository.save(existing);
    }

    public void deleteCertificate(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Certificate not found");
        }

        repository.deleteById(id);
    }
}