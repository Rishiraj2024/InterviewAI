package com.aiinterview.platform.controller;

import com.aiinterview.platform.dto.LeaderboardResponse;
import com.aiinterview.platform.entity.User;
import com.aiinterview.platform.repository.UserRepository;
import com.aiinterview.platform.wrapper.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/leaderboard")
@RequiredArgsConstructor
@Tag(name = "Leaderboard Controller", description = "Endpoints for fetching candidate competitive ranks")
public class LeaderboardController {

    private final UserRepository userRepository;

    @GetMapping
    @Operation(summary = "Get list of top ranking candidates sorted by XP desc")
    public ResponseEntity<ApiResponse<List<LeaderboardResponse>>> getLeaderboard() {
        List<User> users = userRepository.findAll(
                PageRequest.of(0, 50, Sort.by("xp").descending())
        ).getContent();

        List<LeaderboardResponse> response = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
            User u = users.get(i);
            response.add(
                    LeaderboardResponse.builder()
                            .userId(u.getId())
                            .firstName(u.getFirstName())
                            .lastName(u.getLastName())
                            .level(u.getLevel())
                            .xp(u.getXp())
                            .rank(i + 1)
                            .avatarUrl(u.getAvatarUrl())
                            .build()
            );
        }

        return ResponseEntity.ok(ApiResponse.success(response, "Leaderboard stats retrieved successfully"));
    }
}
