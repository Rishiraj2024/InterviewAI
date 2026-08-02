package com.aiinterview.platform.controller;

import com.aiinterview.platform.dto.UserResponse;
import com.aiinterview.platform.service.UserService;
import com.aiinterview.platform.wrapper.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.aiinterview.platform.dto.UserProfileStatsResponse;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "User Controller", description = "Endpoints for user profiles and resumes")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @Operation(summary = "Get current authenticated user profile")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(Principal principal) {
        UserResponse profile = userService.getUserProfile(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(profile, "Profile retrieved successfully"));
    }

    @PostMapping("/resume")
    @Operation(summary = "Upload candidate PDF resume to Cloudinary")
    public ResponseEntity<ApiResponse<UserResponse>> uploadResume(
            Principal principal,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        UserResponse updatedProfile = userService.uploadResume(principal.getName(), file);
        return ResponseEntity.ok(ApiResponse.success(updatedProfile, "Resume uploaded successfully"));
    }

    @GetMapping("/stats")
    @Operation(summary = "Get user gamification stats, streak, badges, and levels")
    public ResponseEntity<ApiResponse<UserProfileStatsResponse>> getStats(Principal principal) {
        UserProfileStatsResponse stats = userService.getUserStats(principal.getName());
        return ResponseEntity.ok(ApiResponse.success(stats, "Stats retrieved successfully"));
    }

    @PutMapping("/social")
    @Operation(summary = "Update user GitHub and LinkedIn profile urls")
    public ResponseEntity<ApiResponse<UserResponse>> updateSocials(
            Principal principal,
            @RequestParam(required = false) String githubUrl,
            @RequestParam(required = false) String linkedinUrl
    ) {
        UserResponse updated = userService.updateSocialLinks(principal.getName(), githubUrl, linkedinUrl);
        return ResponseEntity.ok(ApiResponse.success(updated, "Social profile links updated successfully"));
    }
}
