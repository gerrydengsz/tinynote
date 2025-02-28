package com.example.notesystem.service;

import com.wf.captcha.GifCaptcha;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class CaptchaService {
    private final Map<String, String> captchaStore = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public Map<String, String> generateCaptcha() {
        try {
            // 使用 GifCaptcha，宽度130，高度48，验证码长度5
            GifCaptcha captcha = new GifCaptcha(130, 48, 5);
            
            String captchaId = String.valueOf(System.currentTimeMillis());
            String captchaText = captcha.text().toLowerCase();
            
            captchaStore.put(captchaId, captchaText);
            scheduler.schedule(() -> captchaStore.remove(captchaId), 5, TimeUnit.MINUTES);
            
            Map<String, String> result = new HashMap<>();
            result.put("captchaId", captchaId);
            result.put("captchaImg", captcha.toBase64());
            
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to generate captcha: " + e.getMessage());
        }
    }

    public boolean validateCaptcha(String captchaId, String captchaText) {
        String storedCaptcha = captchaStore.get(captchaId);
        if (storedCaptcha != null && storedCaptcha.equals(captchaText.toLowerCase())) {
            captchaStore.remove(captchaId);
            return true;
        }
        return false;
    }
} 