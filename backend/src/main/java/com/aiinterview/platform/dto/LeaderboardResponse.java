package com.aiinterview.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaderboardResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private Integer level;
    private Integer xp;
    private Integer rank;
    private String avatarUrl;
}
