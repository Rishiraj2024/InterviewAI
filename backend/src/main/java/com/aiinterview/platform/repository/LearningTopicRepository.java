package com.aiinterview.platform.repository;

import com.aiinterview.platform.entity.LearningTopic;
import com.aiinterview.platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningTopicRepository extends JpaRepository<LearningTopic, Long> {
    List<LearningTopic> findByUser(User user);
}
