package com.aiinterview.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileStatsResponse {
    private Integer xp;
    private Integer coins;
    private Integer level;
    private Integer streakCount;
    private Integer nextLevelXpRequired;
    private Integer currentLevelProgressPercentage;
    private List<String> badges;
    private Integer completedInterviewsCount;
    private Integer completedCodingChallengesCount;
    private Integer atsScore;
}
