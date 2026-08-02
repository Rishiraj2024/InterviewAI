package com.aiinterview.platform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "jd_matches")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JDMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private User user;

    @Column(nullable = false)
    private String jobTitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String jobDescriptionText;

    private Integer compatibilityScore;

    @Column(columnDefinition = "TEXT")
    private String skillGap;

    @Column(columnDefinition = "TEXT")
    private String missingKeywords;

    @Column(columnDefinition = "TEXT")
    private String recommendedLearning;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
