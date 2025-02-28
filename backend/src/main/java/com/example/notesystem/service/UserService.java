package com.example.notesystem.service;

import com.example.notesystem.model.User;
import com.example.notesystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.notesystem.util.MessageUtils;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException(MessageUtils.getMessage("user.username.exists"));
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException(MessageUtils.getMessage("user.email.exists"));
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
} 