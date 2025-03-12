package com.example.notesystem.controller;

import com.example.notesystem.service.CaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/captcha")
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