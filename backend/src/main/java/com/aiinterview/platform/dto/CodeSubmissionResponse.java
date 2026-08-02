package com.aiinterview.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeSubmissionResponse {
    private Long id;
    private Long questionId;
    private String questionTitle;
    private String code;
    private String language;
    private String status;
    private String feedback;
    private Integer executionTimeMs;
    private Integer memoryUsageKb;
    private LocalDateTime createdAt;
}
