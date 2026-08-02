package com.aiinterview.platform.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${app.gemini.api-key}")
    private String apiKey;

    @Value("${app.gemini.url}")
    private String geminiUrl;

    public String generateContent(String prompt) {
        try {
            String url = geminiUrl + "?key=" + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Structure request body for Gemini API v1beta
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);

            Map<String, Object> content = new HashMap<>();
            content.put("parts", List.of(part));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", List.of(content));

            // Set system instruction / generationConfig if needed, but simple prompt is reliable
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("responseMimeType", "application/json"); 
            // We can ask Gemini to return JSON in prompts and parse it
            
            // To ensure compatibility, we'll request JSON inside the prompt and extract it.

            String requestBodyJson = objectMapper.writeValueAsString(requestBody);
            HttpEntity<String> entity = new HttpEntity<>(requestBodyJson, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode root = objectMapper.readTree(response.getBody());
                JsonNode candidate = root.path("candidates").get(0);
                JsonNode textNode = candidate.path("content").path("parts").get(0).path("text");
                return textNode.asText();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Helper to generate dynamic interview question
     */
    public String generateQuestion(String jobTitle, String jobDescription, String resumeText, String historyJson) {
        String prompt = "You are a professional senior interviewer. Generate the next highly relevant interview question for a candidate interviewing for the role of: " + jobTitle + ".\n"
                + "Job Description: " + jobDescription + "\n"
                + "Candidate Resume: " + (resumeText != null ? resumeText : "Not provided") + "\n"
                + "Previous Interview History (Questions & Answers): " + (historyJson != null ? historyJson : "None") + "\n\n"
                + "Generate ONLY the question. Do not include introductory text, headers, or pleasantries.";
        
        return generateContent(prompt);
    }

    /**
     * Helper to evaluate a specific response
     */
    public Map<String, Object> evaluateAnswer(String question, String answer) {
        String prompt = "You are an expert interviewer evaluating a candidate's answer to this question: \"" + question + "\"\n"
                + "Candidate's Answer: \"" + answer + "\"\n\n"
                + "Provide feedback in JSON format strictly matching the following schema:\n"
                + "{\n"
                + "  \"score\": <Integer from 1 to 10>,\n"
                + "  \"feedback\": \"<Constructive evaluation of the answer>\"\n"
                + "}\n"
                + "Return ONLY the raw JSON string. Do not include Markdown blocks like ```json.";
        
        try {
            String result = generateContent(prompt);
            if (result != null) {
                // Strip markdown backticks just in case Gemini ignored instructions
                result = result.replaceAll("```json", "").replaceAll("```", "").trim();
                return objectMapper.readValue(result, Map.class);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        Map<String, Object> fallback = new HashMap<>();
        fallback.put("score", 5);
        fallback.put("feedback", "No detailed feedback could be generated at this time.");
        return fallback;
    }

    /**
     * Helper to generate final compiled feedback
     */
    public Map<String, Object> generateFinalFeedback(String jobTitle, String historyJson) {
        String prompt = "You are a senior hiring committee summarizing a candidate's performance in an interview for the role: " + jobTitle + ".\n"
                + "Interview History (Questions, Answers, and individual scores): " + historyJson + "\n\n"
                + "Analyze the candidate's answers comprehensively and return a JSON object strictly matching this schema:\n"
                + "{\n"
                + "  \"overallScore\": <Integer from 1 to 100>,\n"
                + "  \"strengths\": \"<Comma-separated list of key strengths>\",\n"
                + "  \"weaknesses\": \"<Comma-separated list of key weaknesses or areas needed for improvement>\",\n"
                + "  \"recommendations\": \"<Specific professional recommendations to prepare them for actual interviews>\",\n"
                + "  \"detailedAnalysis\": \"<A detailed, narrative review summarizing their performance (around 2-3 paragraphs)>\"\n"
                + "}\n"
                + "Return ONLY the raw JSON string. Do not include markdown code block formatting.";
        
        try {
            String result = generateContent(prompt);
            if (result != null) {
                result = result.replaceAll("```json", "").replaceAll("```", "").trim();
                return objectMapper.readValue(result, Map.class);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        Map<String, Object> fallback = new HashMap<>();
        fallback.put("overallScore", 60);
        fallback.put("strengths", "Communication, Technical approach");
        fallback.put("weaknesses", "Deep system design details");
        fallback.put("recommendations", "Review fundamental design patterns and system design.");
        fallback.put("detailedAnalysis", "The candidate completed the session but detailed analysis generation was interrupted.");
        return fallback;
    }
}
