package com.aiinterview.platform.controller;

import com.aiinterview.platform.dto.JDMatchRequest;
import com.aiinterview.platform.dto.JDMatchResponse;
import com.aiinterview.platform.dto.ResumeAnalysisResponse;
import com.aiinterview.platform.service.AnalyzerService;
import com.aiinterview.platform.wrapper.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/analyzer")
@RequiredArgsConstructor
@Tag(name = "Analyzer Controller", description = "Endpoints for resume score checks and job compatibility matching")
public class AnalyzerController {

    private final AnalyzerService analyzerService;

    @PostMapping("/resume")
    @Operation(summary = "Upload and run detailed ATS analysis on candidate resume")
    public ResponseEntity<ApiResponse<ResumeAnalysisResponse>> analyzeResume(
            Principal principal,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        ResumeAnalysisResponse response = analyzerService.analyzeResume(principal.getName(), file);
        return ResponseEntity.ok(ApiResponse.success(response, "Resume ATS score calculated successfully"));
    }

    @GetMapping("/resume")
    @Operation(summary = "Get last generated ATS analysis details")
    public ResponseEntity<ApiResponse<ResumeAnalysisResponse>> getAnalysis(Principal principal) {
        ResumeAnalysisResponse response = analyzerService.getAnalysis(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(response, "Resume analysis retrieved successfully"));
    }

    @PostMapping("/job/match")
    @Operation(summary = "Compare resume skills against target Job Description details")
    public ResponseEntity<ApiResponse<JDMatchResponse>> matchJobDescription(
            Principal principal,
            @Valid @RequestBody JDMatchRequest request
    ) {
        JDMatchResponse response = analyzerService.matchJobDescription(
                principal.getName(),
                request.getJobTitle(),
                request.getJobDescriptionText()
        );
        return ResponseEntity.ok(ApiResponse.success(response, "Job description matched successfully"));
    }

    @GetMapping("/job/matches")
    @Operation(summary = "Get list of all previous JD compatibility checks")
    public ResponseEntity<ApiResponse<List<JDMatchResponse>>> getMatches(Principal principal) {
        List<JDMatchResponse> responses = analyzerService.getUserJDMatches(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(responses, "Job matches retrieved successfully"));
    }
}
