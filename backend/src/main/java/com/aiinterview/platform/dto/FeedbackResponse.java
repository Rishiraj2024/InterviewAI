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
public class FeedbackResponse {
    private Long id;
    private Integer overallScore;
    private String strengths;
    private String weaknesses;
    private String recommendations;
    private String detailedAnalysis;
    private LocalDateTime createdAt;
}
