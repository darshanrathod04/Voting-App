package com.poll.voting.service;

import com.poll.voting.model.OptionVote;
import com.poll.voting.model.Poll;
import com.poll.voting.repository.PollRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepo pollRepo;

    public Poll addPoll( Poll poll) {
        return pollRepo.save(poll);
    }

    public List<Poll> findAllPolls() {
        return pollRepo.findAll();
    }

    public Optional<Poll> findByIds(Long id) {
        return pollRepo.findById(id);

    }

    public void vote(Long pollId, int optionIndex) {

        Poll poll = pollRepo.findById(pollId).orElseThrow(() -> new RuntimeException("poll not found"));

        List<OptionVote> options = poll.getOption();

        if (optionIndex < 0 || optionIndex >= options.size()){
            throw new IllegalArgumentException("option index out of bounds");

        }
        OptionVote selectedOption = options.get(optionIndex);

        selectedOption.setVoteOption(selectedOption.getVoteOption() + 1);

        pollRepo.save(poll);
    }
}
