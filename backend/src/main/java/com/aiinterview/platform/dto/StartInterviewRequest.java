package com.aiinterview.platform.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StartInterviewRequest {

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    private String jobDescription;
}
