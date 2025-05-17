// CallLogs.java
package com.whatsfirst.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.whatsfirst.model.CallLog;
import com.whatsfirst.repository.CallLogRepository;

@RestController
@RequestMapping("/api/calls")
@CrossOrigin(origins = "*")
public class CallController {

    @Autowired
    private CallLogRepository callLogRepo;

    @PostMapping("/log")
    public ResponseEntity<?> saveLog(@RequestBody CallLog log) {
        callLogRepo.save(log);
        return ResponseEntity.ok("Log saved");
    }

    @GetMapping("/all")
    public List<CallLog> getAllLogs() {
        return callLogRepo.findAll();
    }

    @GetMapping("/search")
    public List<CallLog> searchLogs(
            @RequestParam(required = false) String type,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        if (type != null && date != null) {
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = start.plusDays(1);
            return callLogRepo.findByTypeAndTimestampBetween(type, start, end);
        } else if (type != null) {
            return callLogRepo.findByType(type);
        } else if (date != null) {
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = start.plusDays(1);
            return callLogRepo.findByTimestampBetween(start, end);
        } else {
            return callLogRepo.findAll();
        }
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        long total = callLogRepo.count();
        long whatsapp = callLogRepo.countByType("WhatsApp");
        long gsm = callLogRepo.countByType("GSM");
        long missed = callLogRepo.countByDuration(0);

        Map<String, Long> stats = new HashMap<>();
        stats.put("totalCalls", total);
        stats.put("whatsappCalls", whatsapp);
        stats.put("gsmCalls", gsm);
        stats.put("missedCalls", missed);

        return stats;
    }
}

