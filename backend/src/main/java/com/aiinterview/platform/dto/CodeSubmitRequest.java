package com.aiinterview.platform.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CodeSubmitRequest {

    @NotBlank(message = "Language is required")
    private String language; // JAVA, CPP, PYTHON, JS, SQL

    @NotBlank(message = "Code cannot be empty")
    private String code;
}
