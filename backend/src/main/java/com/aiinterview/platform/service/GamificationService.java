package com.aiinterview.platform.service;

import com.aiinterview.platform.entity.User;
import com.aiinterview.platform.entity.UserBadge;
import com.aiinterview.platform.repository.UserBadgeRepository;
import com.aiinterview.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GamificationService {

    private final UserRepository userRepository;
    private final UserBadgeRepository badgeRepository;

    private static final int XP_PER_LEVEL = 500;

    @Transactional
    public void awardRewards(User user, int xpAmount, int coinAmount) {
        user.setXp(user.getXp() + xpAmount);
        user.setCoins(user.getCoins() + coinAmount);

        // Check level-up
        int newLevel = (user.getXp() / XP_PER_LEVEL) + 1;
        if (newLevel > user.getLevel()) {
            user.setLevel(newLevel);
            // Auto-award level-up badge
            awardBadge(user, "LEVEL_" + newLevel, "level.png", "Reached Level " + newLevel + " in interview preparation!");
        }

        // Award streak-based badges
        if (user.getStreakCount() >= 7 && !badgeRepository.existsByUserAndBadgeName(user, "STREAK_7")) {
            awardBadge(user, "STREAK_7", "fire.png", "7-Day Active Streak champion!");
        }

        updateStreak(user);
        userRepository.save(user);
    }

    @Transactional
    public void updateStreak(User user) {
        LocalDateTime now = LocalDateTime.now();
        if (user.getLastActiveDate() == null) {
            user.setStreakCount(1);
        } else {
            LocalDate lastActive = user.getLastActiveDate().toLocalDate();
            LocalDate today = now.toLocalDate();

            if (today.isEqual(lastActive.plusDays(1))) {
                user.setStreakCount(user.getStreakCount() + 1);
            } else if (today.isAfter(lastActive.plusDays(1))) {
                user.setStreakCount(1); // Reset
            }
        }
        user.setLastActiveDate(now);
        userRepository.save(user);
    }

    private void awardBadge(User user, String name, String icon, String desc) {
        if (!badgeRepository.existsByUserAndBadgeName(user, name)) {
            UserBadge badge = UserBadge.builder()
                    .user(user)
                    .badgeName(name)
                    .badgeIcon(icon)
                    .description(desc)
                    .build();
            badgeRepository.save(badge);
        }
    }
}
