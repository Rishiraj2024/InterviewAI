package com.aiinterview.platform.repository;

import com.aiinterview.platform.entity.JDMatch;
import com.aiinterview.platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JDMatchRepository extends JpaRepository<JDMatch, Long> {
    List<JDMatch> findByUserOrderByCreatedAtDesc(User user);
}
