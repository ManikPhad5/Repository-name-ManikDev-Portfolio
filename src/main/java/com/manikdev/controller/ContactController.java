package com.manikdev.controller;

import com.manikdev.entity.ContactMessage;
import com.manikdev.service.ContactMessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactMessageService service;

    public ContactController(ContactMessageService service) {
        this.service = service;
    }

    @PostMapping
    public ContactMessage createMessage(
            @RequestBody ContactMessage message) {

        return service.createMessage(message);
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return service.getAllMessages();
    }

    @DeleteMapping("/{id}")
    public String deleteMessage(@PathVariable Long id) {

        service.deleteMessage(id);

        return "Message deleted successfully";
    }
}
