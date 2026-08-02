package com.aiinterview.platform.repository;

import com.aiinterview.platform.entity.User;
import com.aiinterview.platform.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    List<UserBadge> findByUser(User user);
    boolean existsByUserAndBadgeName(User user, String badgeName);
}
