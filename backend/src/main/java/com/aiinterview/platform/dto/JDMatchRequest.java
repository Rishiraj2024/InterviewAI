package com.aiinterview.platform.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JDMatchRequest {

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Job description cannot be empty")
    private String jobDescriptionText;
}
