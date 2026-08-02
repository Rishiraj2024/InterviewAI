package com.aiinterview.platform.repository;

import com.aiinterview.platform.entity.CodingQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodingQuestionRepository extends JpaRepository<CodingQuestion, Long> {
    Page<CodingQuestion> findByDifficulty(CodingQuestion.Difficulty difficulty, Pageable pageable);
    Page<CodingQuestion> findByTopic(CodingQuestion.Topic topic, Pageable pageable);
    Page<CodingQuestion> findByDifficultyAndTopic(CodingQuestion.Difficulty difficulty, CodingQuestion.Topic topic, Pageable pageable);
}
