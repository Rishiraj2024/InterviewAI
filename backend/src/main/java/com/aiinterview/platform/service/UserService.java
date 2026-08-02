package com.aiinterview.platform.service;

import com.aiinterview.platform.config.JwtService;
import com.aiinterview.platform.dto.AuthResponse;
import com.aiinterview.platform.dto.LoginRequest;
import com.aiinterview.platform.dto.RegisterRequest;
import com.aiinterview.platform.dto.UserResponse;
import com.aiinterview.platform.dto.UserProfileStatsResponse;
import com.aiinterview.platform.entity.User;
import com.aiinterview.platform.entity.ResumeAnalysis;
import com.aiinterview.platform.entity.Interview;
import com.aiinterview.platform.entity.UserCodingSubmission;
import com.aiinterview.platform.exception.CustomException;
import com.aiinterview.platform.repository.UserRepository;
import com.aiinterview.platform.repository.InterviewRepository;
import com.aiinterview.platform.repository.UserCodingSubmissionRepository;
import com.aiinterview.platform.repository.ResumeAnalysisRepository;
import com.aiinterview.platform.repository.UserBadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CloudinaryService cloudinaryService;
    private final InterviewRepository interviewRepository;
    private final UserCodingSubmissionRepository submissionRepository;
    private final ResumeAnalysisRepository analysisRepository;
    private final UserBadgeRepository badgeRepository;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomException("Email is already registered", HttpStatus.BAD_REQUEST);
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(User.Role.ROLE_USER)
                .build();

        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(savedUser);

        return AuthResponse.builder()
                .token(jwtToken)
                .user(mapToUserResponse(savedUser))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        String jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .user(mapToUserResponse(user))
                .build();
    }

    public UserResponse getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
        return mapToUserResponse(user);
    }

    public UserResponse uploadResume(String email, MultipartFile file) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        String resumeUrl = cloudinaryService.uploadFile(file, "resumes");
        user.setResumeUrl(resumeUrl);
        
        User savedUser = userRepository.save(user);
        return mapToUserResponse(savedUser);
    }

    public UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .resumeUrl(user.getResumeUrl())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole().name())
                .build();
    }

    @Transactional(readOnly = true)
    public UserProfileStatsResponse getUserStats(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        int interviewCount = (int) interviewRepository.findByUserOrderByCreatedAtDesc(user)
                .stream().filter(i -> i.getStatus() == Interview.InterviewStatus.COMPLETED).count();

        int codingCount = (int) submissionRepository.findByUserOrderByCreatedAtDesc(user)
                .stream().filter(s -> s.getStatus() == UserCodingSubmission.SubmissionStatus.ACCEPTED).count();

        int atsScore = 0;
        ResumeAnalysis ra = analysisRepository.findByUser(user).orElse(null);
        if (ra != null) {
            atsScore = ra.getAtsScore();
        }

        List<String> badges = badgeRepository.findByUser(user)
                .stream().map(b -> b.getBadgeName()).collect(Collectors.toList());

        int currentXp = user.getXp() != null ? user.getXp() : 0;
        int currentLevel = user.getLevel() != null ? user.getLevel() : 1;
        int nextLevelXpRequired = currentLevel * 500;
        int currentLevelProgressPercentage = (int) (((double) (currentXp % 500) / 500) * 100);

        return UserProfileStatsResponse.builder()
                .xp(currentXp)
                .coins(user.getCoins() != null ? user.getCoins() : 0)
                .level(currentLevel)
                .streakCount(user.getStreakCount() != null ? user.getStreakCount() : 0)
                .nextLevelXpRequired(nextLevelXpRequired)
                .currentLevelProgressPercentage(currentLevelProgressPercentage)
                .badges(badges)
                .completedInterviewsCount(interviewCount)
                .completedCodingChallengesCount(codingCount)
                .atsScore(atsScore)
                .build();
    }

    @Transactional
    public UserResponse updateSocialLinks(String email, String githubUrl, String linkedinUrl) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
        
        user.setGithubUrl(githubUrl);
        user.setLinkedinUrl(linkedinUrl);
        
        User saved = userRepository.save(user);
        return mapToUserResponse(saved);
    }
}
