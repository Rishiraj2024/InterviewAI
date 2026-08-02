package com.aiinterview.platform.service;

import com.aiinterview.platform.dto.FeedbackResponse;
import com.aiinterview.platform.dto.InterviewResponse;
import com.aiinterview.platform.dto.QuestionResponse;
import com.aiinterview.platform.dto.StartInterviewRequest;
import com.aiinterview.platform.dto.SubmitAnswerRequest;
import com.aiinterview.platform.entity.Feedback;
import com.aiinterview.platform.entity.Interview;
import com.aiinterview.platform.entity.Question;
import com.aiinterview.platform.entity.User;
import com.aiinterview.platform.exception.CustomException;
import com.aiinterview.platform.repository.FeedbackRepository;
import com.aiinterview.platform.repository.InterviewRepository;
import com.aiinterview.platform.repository.QuestionRepository;
import com.aiinterview.platform.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final QuestionRepository questionRepository;
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    private static final int MAX_QUESTIONS = 5;

    @Transactional
    public InterviewResponse startInterview(String userEmail, StartInterviewRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        // Close any currently active interviews to avoid dirty state
        interviewRepository.findFirstByUserAndStatusOrderByCreatedAtDesc(user, Interview.InterviewStatus.ACTIVE)
                .ifPresent(existing -> {
                    existing.setStatus(Interview.InterviewStatus.COMPLETED);
                    existing.setCompletedAt(LocalDateTime.now());
                    interviewRepository.save(existing);
                });

        Interview interview = Interview.builder()
                .user(user)
                .jobTitle(request.getJobTitle())
                .jobDescription(request.getJobDescription())
                .status(Interview.InterviewStatus.ACTIVE)
                .build();

        Interview savedInterview = interviewRepository.save(interview);

        // Generate the first question asynchronously/synchronously
        String firstQuestionText = geminiService.generateQuestion(
                request.getJobTitle(),
                request.getJobDescription(),
                user.getResumeUrl(),
                "None"
        );

        if (firstQuestionText == null || firstQuestionText.trim().isEmpty()) {
            firstQuestionText = "Could you please tell me about your background and your relevant experience for this role?";
        }

        Question question = Question.builder()
                .interview(savedInterview)
                .questionText(firstQuestionText)
                .order(1)
                .build();

        questionRepository.save(question);

        // Add to list for mapping
        savedInterview.setQuestions(List.of(question));
        
        return mapToInterviewResponse(savedInterview);
    }

    @Transactional
    public QuestionResponse submitAnswer(String userEmail, SubmitAnswerRequest request) {
        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new CustomException("Question not found", HttpStatus.NOT_FOUND));

        Interview interview = question.getInterview();
        if (!interview.getUser().getEmail().equals(userEmail)) {
            throw new CustomException("Access Denied", HttpStatus.FORBIDDEN);
        }

        if (interview.getStatus() != Interview.InterviewStatus.ACTIVE) {
            throw new CustomException("Interview is not active", HttpStatus.BAD_REQUEST);
        }

        question.setResponseText(request.getResponseText());
        question.setAnsweredAt(LocalDateTime.now());

        // Call Gemini to evaluate single response
        Map<String, Object> evaluation = geminiService.evaluateAnswer(
                question.getQuestionText(),
                request.getResponseText()
        );

        Integer score = (Integer) evaluation.get("score");
        String feedbackText = (String) evaluation.get("feedback");

        question.setScore(score != null ? score : 5);
        question.setEvaluationFeedback(feedbackText != null ? feedbackText : "Thank you for your response.");

        Question savedQuestion = questionRepository.save(question);

        // Trigger next question check or complete
        return mapToQuestionResponse(savedQuestion);
    }

    @Transactional
    public InterviewResponse getNextQuestionOrFinalize(String userEmail, Long interviewId) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new CustomException("Interview not found", HttpStatus.NOT_FOUND));

        if (!interview.getUser().getEmail().equals(userEmail)) {
            throw new CustomException("Access Denied", HttpStatus.FORBIDDEN);
        }

        if (interview.getStatus() != Interview.InterviewStatus.ACTIVE) {
            return mapToInterviewResponse(interview);
        }

        int answeredCount = (int) interview.getQuestions().stream()
                .filter(q -> q.getResponseText() != null)
                .count();

        if (answeredCount >= MAX_QUESTIONS) {
            return finalizeInterview(interview);
        }

        // Generate next question
        String historyJson = generateHistoryJson(interview);
        String nextQuestionText = geminiService.generateQuestion(
                interview.getJobTitle(),
                interview.getJobDescription(),
                interview.getUser().getResumeUrl(),
                historyJson
        );

        if (nextQuestionText == null || nextQuestionText.trim().isEmpty()) {
            nextQuestionText = "How do you handle technical debt or prioritize features under tight deadlines?";
        }

        Question nextQuestion = Question.builder()
                .interview(interview)
                .questionText(nextQuestionText)
                .order(answeredCount + 1)
                .build();

        questionRepository.save(nextQuestion);
        interview.getQuestions().add(nextQuestion);

        return mapToInterviewResponse(interview);
    }

    @Transactional
    public InterviewResponse finalizeInterview(Interview interview) {
        interview.setStatus(Interview.InterviewStatus.COMPLETED);
        interview.setCompletedAt(LocalDateTime.now());

        String historyJson = generateHistoryJson(interview);
        Map<String, Object> finalFeedbackData = geminiService.generateFinalFeedback(
                interview.getJobTitle(),
                historyJson
        );

        Feedback feedback = Feedback.builder()
                .interview(interview)
                .overallScore((Integer) finalFeedbackData.getOrDefault("overallScore", 70))
                .strengths((String) finalFeedbackData.getOrDefault("strengths", "Communication, clarity"))
                .weaknesses((String) finalFeedbackData.getOrDefault("weaknesses", "System Design deep dive"))
                .recommendations((String) finalFeedbackData.getOrDefault("recommendations", "Review dynamic programming and system performance tuning."))
                .detailedAnalysis((String) finalFeedbackData.getOrDefault("detailedAnalysis", "Candidate performed well across general behavioral questions."))
                .build();

        feedbackRepository.save(feedback);
        interview.setFeedback(feedback);

        Interview saved = interviewRepository.save(interview);
        return mapToInterviewResponse(saved);
    }

    public List<InterviewResponse> getUserInterviews(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        return interviewRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToInterviewResponse)
                .collect(Collectors.toList());
    }

    public InterviewResponse getInterviewDetails(String userEmail, Long id) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new CustomException("Interview not found", HttpStatus.NOT_FOUND));

        if (!interview.getUser().getEmail().equals(userEmail)) {
            throw new CustomException("Access Denied", HttpStatus.FORBIDDEN);
        }

        return mapToInterviewResponse(interview);
    }

    private String generateHistoryJson(Interview interview) {
        try {
            List<Map<String, Object>> history = new ArrayList<>();
            for (Question q : interview.getQuestions()) {
                if (q.getResponseText() != null) {
                    Map<String, Object> item = new HashMap<>();
                    item.put("question", q.getQuestionText());
                    item.put("answer", q.getResponseText());
                    item.put("score", q.getScore());
                    item.put("feedback", q.getEvaluationFeedback());
                    history.add(item);
                }
            }
            return objectMapper.writeValueAsString(history);
        } catch (Exception e) {
            return "[]";
        }
    }

    private InterviewResponse mapToInterviewResponse(Interview interview) {
        List<QuestionResponse> questions = interview.getQuestions().stream()
                .map(this::mapToQuestionResponse)
                .collect(Collectors.toList());

        FeedbackResponse feedback = null;
        if (interview.getFeedback() != null) {
            feedback = FeedbackResponse.builder()
                    .id(interview.getFeedback().getId())
                    .overallScore(interview.getFeedback().getOverallScore())
                    .strengths(interview.getFeedback().getStrengths())
                    .weaknesses(interview.getFeedback().getWeaknesses())
                    .recommendations(interview.getFeedback().getRecommendations())
                    .detailedAnalysis(interview.getFeedback().getDetailedAnalysis())
                    .createdAt(interview.getFeedback().getCreatedAt())
                    .build();
        }

        return InterviewResponse.builder()
                .id(interview.getId())
                .userId(interview.getUser().getId())
                .jobTitle(interview.getJobTitle())
                .jobDescription(interview.getJobDescription())
                .status(interview.getStatus().name())
                .questions(questions)
                .feedback(feedback)
                .createdAt(interview.getCreatedAt())
                .completedAt(interview.getCompletedAt())
                .build();
    }

    private QuestionResponse mapToQuestionResponse(Question question) {
        return QuestionResponse.builder()
                .id(question.getId())
                .questionText(question.getQuestionText())
                .responseText(question.getResponseText())
                .evaluationFeedback(question.getEvaluationFeedback())
                .score(question.getScore())
                .order(question.getOrder())
                .createdAt(question.getCreatedAt())
                .answeredAt(question.getAnsweredAt())
                .build();
    }
}
