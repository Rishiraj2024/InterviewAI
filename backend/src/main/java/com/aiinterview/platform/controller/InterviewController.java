package com.aiinterview.platform.controller;

import com.aiinterview.platform.dto.InterviewResponse;
import com.aiinterview.platform.dto.QuestionResponse;
import com.aiinterview.platform.dto.StartInterviewRequest;
import com.aiinterview.platform.dto.SubmitAnswerRequest;
import com.aiinterview.platform.service.InterviewService;
import com.aiinterview.platform.wrapper.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/interviews")
@RequiredArgsConstructor
@Tag(name = "Interview Controller", description = "Endpoints for managing interview sessions and questions")
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/start")
    @Operation(summary = "Start/initialize a new AI interview session")
    public ResponseEntity<ApiResponse<InterviewResponse>> startInterview(
            Principal principal,
            @Valid @RequestBody StartInterviewRequest request
    ) {
        InterviewResponse interview = interviewService.startInterview(principal.getName(), request);
        return ResponseEntity.ok(ApiResponse.success(interview, "Interview session started successfully"));
    }

    @PostMapping("/submit-answer")
    @Operation(summary = "Submit an answer to a specific question for evaluation")
    public ResponseEntity<ApiResponse<QuestionResponse>> submitAnswer(
            Principal principal,
            @Valid @RequestBody SubmitAnswerRequest request
    ) {
        QuestionResponse question = interviewService.submitAnswer(principal.getName(), request);
        return ResponseEntity.ok(ApiResponse.success(question, "Answer submitted and evaluated successfully"));
    }

    @PostMapping("/{id}/next")
    @Operation(summary = "Get the next interview question or compile final feedback if session is complete")
    public ResponseEntity<ApiResponse<InterviewResponse>> getNextQuestion(
            Principal principal,
            @PathVariable Long id
    ) {
        InterviewResponse interview = interviewService.getNextQuestionOrFinalize(principal.getName(), id);
        return ResponseEntity.ok(ApiResponse.success(interview, "Next action executed successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get detailed report of a specific interview session")
    public ResponseEntity<ApiResponse<InterviewResponse>> getInterviewDetails(
            Principal principal,
            @PathVariable Long id
    ) {
        InterviewResponse interview = interviewService.getInterviewDetails(principal.getName(), id);
        return ResponseEntity.ok(ApiResponse.success(interview, "Interview details retrieved successfully"));
    }

    @GetMapping
    @Operation(summary = "Get list of all previous interviews for the candidate")
    public ResponseEntity<ApiResponse<List<InterviewResponse>>> getUserInterviews(Principal principal) {
        List<InterviewResponse> interviews = interviewService.getUserInterviews(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(interviews, "Interviews retrieved successfully"));
    }
}
