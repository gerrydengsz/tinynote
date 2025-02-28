package com.example.notesystem.controller;

import com.example.notesystem.service.CaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/captcha")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.107:3000"})
public class CaptchaController {
    @Autowired
    private CaptchaService captchaService;

    @GetMapping("/generate")
    public ResponseEntity<?> generateCaptcha() {
        Map<String, String> result = captchaService.generateCaptcha();
        result.put("captchaImg", "data:image/png;base64," + result.get("captchaImg"));
        return ResponseEntity.ok(result);
    }
} 