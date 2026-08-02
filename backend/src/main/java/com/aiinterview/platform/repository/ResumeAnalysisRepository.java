package com.aiinterview.platform.repository;

import com.aiinterview.platform.entity.ResumeAnalysis;
import com.aiinterview.platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResumeAnalysisRepository extends JpaRepository<ResumeAnalysis, Long> {
    Optional<ResumeAnalysis> findByUser(User user);
}
