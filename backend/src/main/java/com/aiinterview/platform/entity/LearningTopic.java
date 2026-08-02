package com.aiinterview.platform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "learning_topics")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private User user;

    @Column(nullable = false)
    private String topicName; // DSA, Java, Spring Boot, DBMS, System Design, OS

    @Builder.Default
    private Integer totalQuestions = 30;

    @Builder.Default
    private Integer completedQuestions = 0;

    @Builder.Default
    private Integer progressPercentage = 0; // calculated dynamically

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
