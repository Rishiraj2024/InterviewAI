package com.aiinterview.platform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_badges")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserBadge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private User user;

    @Column(nullable = false)
    private String badgeName; // XP_HUNTER, STREAK_MASTER, CODING_GURU, INTERVIEW_CHAMP

    private String badgeIcon; // icon string key

    private String description;

    @Builder.Default
    private LocalDateTime awardedAt = LocalDateTime.now();
}
