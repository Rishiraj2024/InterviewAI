package com.aiinterview.platform.repository;

import com.aiinterview.platform.entity.Interview;
import com.aiinterview.platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByUserOrderByCreatedAtDesc(User user);
    Optional<Interview> findFirstByUserAndStatusOrderByCreatedAtDesc(User user, Interview.InterviewStatus status);
}
