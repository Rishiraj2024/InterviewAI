package com.aiinterview.platform.controller;

import com.aiinterview.platform.dto.CodeSubmissionResponse;
import com.aiinterview.platform.dto.CodeSubmitRequest;
import com.aiinterview.platform.entity.CodingQuestion;
import com.aiinterview.platform.service.CodingService;
import com.aiinterview.platform.wrapper.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/coding")
@RequiredArgsConstructor
@Tag(name = "Coding Controller", description = "Endpoints for practice coding questions and sandbox runs")
public class CodingController {

    private final CodingService codingService;

    @GetMapping("/questions")
    @Operation(summary = "Get list of all practice coding questions (paginated and filtered)")
    public ResponseEntity<ApiResponse<Page<CodingQuestion>>> getQuestions(
            @RequestParam(required = false) CodingQuestion.Difficulty difficulty,
            @RequestParam(required = false) CodingQuestion.Topic topic,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<CodingQuestion> questions = codingService.getQuestions(difficulty, topic, pageable);
        return ResponseEntity.ok(ApiResponse.success(questions, "Coding questions retrieved successfully"));
    }

    @GetMapping("/questions/{id}")
    @Operation(summary = "Get detailed description and templates for a specific question")
    public ResponseEntity<ApiResponse<CodingQuestion>> getQuestionDetails(@PathVariable Long id) {
        CodingQuestion question = codingService.getQuestionDetails(id);
        return ResponseEntity.ok(ApiResponse.success(question, "Question details retrieved successfully"));
    }

    @PostMapping("/questions/{id}/submit")
    @Operation(summary = "Submit code to run test cases and receive performance evaluations")
    public ResponseEntity<ApiResponse<CodeSubmissionResponse>> submitCode(
            Principal principal,
            @PathVariable Long id,
            @Valid @RequestBody CodeSubmitRequest request
    ) {
        CodeSubmissionResponse response = codingService.submitCode(principal.getName(), id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Code evaluated successfully"));
    }

    @GetMapping("/submissions")
    @Operation(summary = "Get history of all code submissions by the authenticated candidate")
    public ResponseEntity<ApiResponse<List<CodeSubmissionResponse>>> getSubmissions(Principal principal) {
        List<CodeSubmissionResponse> submissions = codingService.getUserSubmissions(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(submissions, "Submissions history retrieved successfully"));
    }
}
