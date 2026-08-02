package com.aiinterview.platform.repository;

import com.aiinterview.platform.entity.User;
import com.aiinterview.platform.entity.UserCodingSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCodingSubmissionRepository extends JpaRepository<UserCodingSubmission, Long> {
    List<UserCodingSubmission> findByUserOrderByCreatedAtDesc(User user);
}
