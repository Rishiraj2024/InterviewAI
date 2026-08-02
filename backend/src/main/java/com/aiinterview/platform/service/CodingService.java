package com.aiinterview.platform.service;

import com.aiinterview.platform.dto.CodeSubmissionResponse;
import com.aiinterview.platform.dto.CodeSubmitRequest;
import com.aiinterview.platform.entity.CodingQuestion;
import com.aiinterview.platform.entity.User;
import com.aiinterview.platform.entity.UserCodingSubmission;
import com.aiinterview.platform.exception.CustomException;
import com.aiinterview.platform.repository.CodingQuestionRepository;
import com.aiinterview.platform.repository.UserCodingSubmissionRepository;
import com.aiinterview.platform.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CodingService {

    private final CodingQuestionRepository codingQuestionRepository;
    private final UserCodingSubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final GeminiService geminiService;
    private final GamificationService gamificationService;
    private final ObjectMapper objectMapper;

    @Transactional
    public void populateSampleQuestions() {
        if (codingQuestionRepository.count() > 0) return;

        CodingQuestion q1 = CodingQuestion.builder()
                .title("Two Sum")
                .description("Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.")
                .difficulty(CodingQuestion.Difficulty.EASY)
                .topic(CodingQuestion.Topic.ARRAY)
                .templateJava("public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write code here\n        return new int[]{};\n    }\n}")
                .templatePython("def twoSum(nums, target):\n    # Write code here\n    pass")
                .templateJs("function twoSum(nums, target) {\n    // Write code here\n}")
                .testCasesJson("[{\"input\": \"[2,7,11,15], 9\", \"output\": \"[0,1]\"}]")
                .build();

        CodingQuestion q2 = CodingQuestion.builder()
                .title("Valid Parentheses")
                .description("Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and in the correct order.")
                .difficulty(CodingQuestion.Difficulty.EASY)
                .topic(CodingQuestion.Topic.STRING)
                .templateJava("public class Solution {\n    public boolean isValid(String s) {\n        // Write code here\n        return false;\n    }\n}")
                .templatePython("def isValid(s):\n    # Write code here\n    pass")
                .templateJs("function isValid(s) {\n    // Write code here\n}")
                .testCasesJson("[{\"input\": \"'()[]{}'\", \"output\": \"true\"}]")
                .build();

        codingQuestionRepository.saveAll(List.of(q1, q2));
    }

    public Page<CodingQuestion> getQuestions(CodingQuestion.Difficulty difficulty, CodingQuestion.Topic topic, Pageable pageable) {
        populateSampleQuestions(); // Guarantee records exist
        if (difficulty != null && topic != null) {
            return codingQuestionRepository.findByDifficultyAndTopic(difficulty, topic, pageable);
        } else if (difficulty != null) {
            return codingQuestionRepository.findByDifficulty(difficulty, pageable);
        } else if (topic != null) {
            return codingQuestionRepository.findByTopic(topic, pageable);
        }
        return codingQuestionRepository.findAll(pageable);
    }

    public CodingQuestion getQuestionDetails(Long id) {
        return codingQuestionRepository.findById(id)
                .orElseThrow(() -> new CustomException("Question not found", HttpStatus.NOT_FOUND));
    }

    @Transactional
    public CodeSubmissionResponse submitCode(String email, Long questionId, CodeSubmitRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        CodingQuestion question = getQuestionDetails(questionId);

        // Call Gemini to act as Sandbox Compiler
        String prompt = "You are an automated compiler sandbox and code analyzer.\n"
                + "Problem Description: " + question.getDescription() + "\n"
                + "User Code (" + request.getLanguage() + "): \n" + request.getCode() + "\n\n"
                + "Analyze if the code compiles and passes hidden test cases. Return a JSON response matching the schema:\n"
                + "{\n"
                + "  \"status\": \"<ACCEPTED | WRONG_ANSWER | COMPILE_ERROR | RUNTIME_ERROR | TIME_LIMIT_EXCEEDED>\",\n"
                + "  \"feedback\": \"<Detailed optimization feedback, code complexity analysis, and syntax checks>\",\n"
                + "  \"executionTimeMs\": <Estimated execution time in integer milliseconds, e.g. 15>,\n"
                + "  \"memoryUsageKb\": <Estimated memory usage in integer kilobytes, e.g. 120>\n"
                + "}\n"
                + "Return ONLY the raw JSON string. Do not include markdown code block characters.";

        String aiSandboxResult = geminiService.generateContent(prompt);
        UserCodingSubmission.SubmissionStatus submissionStatus = UserCodingSubmission.SubmissionStatus.WRONG_ANSWER;
        String feedbackText = "Failed to compile/execute.";
        int executionTime = 20;
        int memoryUsage = 150;

        try {
            if (aiSandboxResult != null) {
                aiSandboxResult = aiSandboxResult.replaceAll("```json", "").replaceAll("```", "").trim();
                Map<String, Object> result = objectMapper.readValue(aiSandboxResult, Map.class);
                String statusStr = (String) result.get("status");
                submissionStatus = UserCodingSubmission.SubmissionStatus.valueOf(statusStr);
                feedbackText = (String) result.get("feedback");
                executionTime = (Integer) result.getOrDefault("executionTimeMs", 20);
                memoryUsage = (Integer) result.getOrDefault("memoryUsageKb", 150);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        UserCodingSubmission submission = UserCodingSubmission.builder()
                .user(user)
                .codingQuestion(question)
                .code(request.getCode())
                .language(request.getLanguage())
                .status(submissionStatus)
                .feedback(feedbackText)
                .executionTimeMs(executionTime)
                .memoryUsageKb(memoryUsage)
                .build();

        UserCodingSubmission saved = submissionRepository.save(submission);

        // Award XP and coins for success
        if (submissionStatus == UserCodingSubmission.SubmissionStatus.ACCEPTED) {
            int xpReward = question.getDifficulty() == CodingQuestion.Difficulty.HARD ? 100 :
                           question.getDifficulty() == CodingQuestion.Difficulty.MEDIUM ? 60 : 30;
            gamificationService.awardRewards(user, xpReward, xpReward / 2);
        } else {
            // Give minor participation XP
            gamificationService.awardRewards(user, 5, 0);
        }

        return mapToSubmissionResponse(saved);
    }

    public List<CodeSubmissionResponse> getUserSubmissions(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        return submissionRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToSubmissionResponse)
                .collect(Collectors.toList());
    }

    private CodeSubmissionResponse mapToSubmissionResponse(UserCodingSubmission sub) {
        return CodeSubmissionResponse.builder()
                .id(sub.getId())
                .questionId(sub.getCodingQuestion().getId())
                .questionTitle(sub.getCodingQuestion().getTitle())
                .code(sub.getCode())
                .language(sub.getLanguage())
                .status(sub.getStatus().name())
                .feedback(sub.getFeedback())
                .executionTimeMs(sub.getExecutionTimeMs())
                .memoryUsageKb(sub.getMemoryUsageKb())
                .createdAt(sub.getCreatedAt())
                .build();
    }
}
