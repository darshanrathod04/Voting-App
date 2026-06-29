package com.poll.voting.repository;

import com.poll.voting.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollRepo extends JpaRepository<Poll,Long> {
}
