package com.whatsfirst.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.whatsfirst.model.CallLog;

public interface CallLogRepository extends JpaRepository<CallLog, Long> {
    List<CallLog> findByType(String type);
    List<CallLog> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    List<CallLog> findByTypeAndTimestampBetween(String type, LocalDateTime start, LocalDateTime end);

    // 👇 Add these two to fix the 403 error
    long countByType(String type);
    long countByDuration(int duration);
}




