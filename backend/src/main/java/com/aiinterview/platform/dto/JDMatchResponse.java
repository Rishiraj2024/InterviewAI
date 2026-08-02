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
public class JDMatchResponse {
    private Long id;
    private String jobTitle;
    private Integer compatibilityScore;
    private String skillGap;
    private String missingKeywords;
    private String recommendedLearning;
    private LocalDateTime createdAt;
}
