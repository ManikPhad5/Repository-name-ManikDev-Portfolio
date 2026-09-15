package com.manikdev.controller;

import com.manikdev.entity.Certificate;
import com.manikdev.service.CertificateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "http://localhost:5173")
public class CertificateController {

    private final CertificateService service;

    public CertificateController(CertificateService service) {
        this.service = service;
    }

    @GetMapping
    public List<Certificate> getAllCertificates() {
        return service.getAllCertificates();
    }

    @PostMapping
    public Certificate createCertificate(
            @RequestBody Certificate certificate) {

        return service.createCertificate(certificate);
    }

    @PutMapping("/{id}")
    public Certificate updateCertificate(
            @PathVariable Long id,
            @RequestBody Certificate certificate) {

        return service.updateCertificate(id, certificate);
    }

    @DeleteMapping("/{id}")
    public String deleteCertificate(@PathVariable Long id) {

        service.deleteCertificate(id);

        return "Certificate deleted successfully";
    }
}