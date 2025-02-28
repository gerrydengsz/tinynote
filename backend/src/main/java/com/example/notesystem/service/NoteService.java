package com.example.notesystem.service;

import com.example.notesystem.model.Note;
import com.example.notesystem.repository.NoteRepository;
import com.example.notesystem.util.MessageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;
    
    public Note createNote(Note note) {
        return noteRepository.save(note);
    }
    
    public List<Note> getNotesByUserId(Long userId) {
        return noteRepository.findByUserId(userId);
    }
    
    public Note updateNote(Long id, Note noteDetails, Long userId) {
        Note note = noteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException(MessageUtils.getMessage("note.not.found")));
            
        if (!note.getUser().getId().equals(userId)) {
            throw new AccessDeniedException(MessageUtils.getMessage("note.no.permission"));
        }
            
        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());
        
        return noteRepository.save(note);
    }
    
    public void deleteNote(Long id, Long userId) {
        Note note = noteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException(MessageUtils.getMessage("note.not.found")));
            
        if (!note.getUser().getId().equals(userId)) {
            throw new AccessDeniedException(MessageUtils.getMessage("note.no.permission"));
        }
        
        noteRepository.deleteById(id);
    }
    
    public Note getNoteById(Long id, Long userId) {
        Note note = noteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException(MessageUtils.getMessage("note.not.found")));
            
        if (!note.getUser().getId().equals(userId)) {
            throw new AccessDeniedException(MessageUtils.getMessage("note.no.permission"));
        }
        
        return note;
    }
} 