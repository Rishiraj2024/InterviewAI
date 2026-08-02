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
public class QuestionResponse {
    private Long id;
    private String questionText;
    private String responseText;
    private String evaluationFeedback;
    private Integer score;
    private Integer order;
    private LocalDateTime createdAt;
    private LocalDateTime answeredAt;
}
