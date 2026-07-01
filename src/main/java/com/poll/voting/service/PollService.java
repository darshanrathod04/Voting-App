package com.poll.voting.service;

import com.poll.voting.model.OptionVote;
import com.poll.voting.model.Poll;
import com.poll.voting.repository.PollRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepo pollRepo;

    public Poll addPoll(Poll poll) {
        return pollRepo.save(poll);
    }

    public List<Poll> findAllPolls() {
        return pollRepo.findAll();
    }

    public Optional<Poll> findByIds(Long id) {
        return pollRepo.findById(id);
    }

    public void vote(Long pollId, int optionIndex) {

        Poll poll = pollRepo.findById(pollId)
                .orElseThrow(() -> new RuntimeException("Poll not found with ID: " + pollId));

        List<OptionVote> options = poll.getOption();

        if (optionIndex < 0 || optionIndex >= options.size()){
            throw new IllegalArgumentException("Selected option index is out of bounds");
        }

        OptionVote selectedOption = options.get(optionIndex);

        Long currentVotes = selectedOption.getVoteCount();
        if (currentVotes == null) {
            currentVotes = 0L;
        }

        selectedOption.setVoteCount(currentVotes + 1);

        pollRepo.save(poll);
    }
}