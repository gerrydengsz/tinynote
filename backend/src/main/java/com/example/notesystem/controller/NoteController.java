package com.example.notesystem.controller;

import com.example.notesystem.model.Note;
import com.example.notesystem.model.User;
import com.example.notesystem.security.UserDetailsImpl;
import com.example.notesystem.service.NoteService;
import com.example.notesystem.util.MessageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.107:3000"})
public class NoteController {
    @Autowired
    private NoteService noteService;
    
    private UserDetailsImpl getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            return (UserDetailsImpl) authentication.getPrincipal();
        }
        throw new RuntimeException(MessageUtils.getMessage("user.not.found"));
    }
    
    @PostMapping
    public ResponseEntity<?> createNote(@RequestBody Note note) {
        try {
            UserDetailsImpl currentUser = getCurrentUser();
            User user = new User(currentUser.getId());
            note.setUser(user);
            Note savedNote = noteService.createNote(note);
            return ResponseEntity.ok(savedNote);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(MessageUtils.getMessage("note.create.failed"));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getCurrentUserNotes() {
        try {
            UserDetailsImpl currentUser = getCurrentUser();
            return ResponseEntity.ok(noteService.getNotesByUserId(currentUser.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(MessageUtils.getMessage("note.list.failed"));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getNote(@PathVariable Long id) {
        try {
            UserDetailsImpl currentUser = getCurrentUser();
            Note note = noteService.getNoteById(id, currentUser.getId());
            return ResponseEntity.ok(note);
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(403).body(MessageUtils.getMessage("note.no.permission"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(MessageUtils.getMessage("note.not.found"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(MessageUtils.getMessage("note.fetch.failed"));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNote(@PathVariable Long id, @RequestBody Note note) {
        try {
            UserDetailsImpl currentUser = getCurrentUser();
            Note updatedNote = noteService.updateNote(id, note, currentUser.getId());
            return ResponseEntity.ok(updatedNote);
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(403).body(MessageUtils.getMessage("note.no.permission"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(MessageUtils.getMessage("note.not.found"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(MessageUtils.getMessage("note.update.failed"));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        try {
            UserDetailsImpl currentUser = getCurrentUser();
            noteService.deleteNote(id, currentUser.getId());
            return ResponseEntity.ok(MessageUtils.getMessage("note.delete.success"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(MessageUtils.getMessage("note.delete.failed"));
        }
    }
} 