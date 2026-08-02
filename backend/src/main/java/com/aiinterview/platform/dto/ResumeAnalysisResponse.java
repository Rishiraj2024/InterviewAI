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
public class ResumeAnalysisResponse {
    private Long id;
    private Integer atsScore;
    private String extractedSkills;
    private String educationSummary;
    private String experienceSummary;
    private String missingKeywords;
    private String recommendedSkills;
    private String improvements;
    private LocalDateTime createdAt;
}
