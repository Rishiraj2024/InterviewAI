package com.aiinterview.platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "coding_questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodingQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Topic topic;

    @Column(columnDefinition = "TEXT")
    private String templateJava;

    @Column(columnDefinition = "TEXT")
    private String templateCpp;

    @Column(columnDefinition = "TEXT")
    private String templatePython;

    @Column(columnDefinition = "TEXT")
    private String templateJs;

    @Column(columnDefinition = "TEXT")
    private String templateSql;

    @Column(columnDefinition = "TEXT")
    private String testCasesJson; // JSON representation of inputs/outputs

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Difficulty {
        EASY,
        MEDIUM,
        HARD
    }

    public enum Topic {
        ARRAY,
        STRING,
        LINKED_LIST,
        STACK_QUEUE,
        TREES_GRAPHS,
        DYNAMIC_PROGRAMMING,
        DATABASE_SQL,
        SYSTEM_DESIGN,
        BEHAVIORAL
    }
}
