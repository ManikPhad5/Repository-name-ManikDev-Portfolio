package com.manikdev.service;

import com.manikdev.entity.ContactMessage;
import com.manikdev.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessageService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage createMessage(ContactMessage message) {
        return repository.save(message);
    }

    public List<ContactMessage> getAllMessages() {
        return repository.findAll();
    }

    public void deleteMessage(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Message not found");
        }

        repository.deleteById(id);
    }
}