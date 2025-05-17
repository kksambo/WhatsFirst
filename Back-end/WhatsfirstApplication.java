package com.whatsfirst;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class WhatsfirstApplication {
    public static void main(String[] args) {
        SpringApplication.run(WhatsfirstApplication.class, args);
    }

	  @GetMapping("/")
    public String home() {
        return "WhatsFirst backend is running.";
    }
}
