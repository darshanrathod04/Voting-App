package com.poll.voting.controller;

import com.poll.voting.model.Poll;
import com.poll.voting.request.Vote;
import com.poll.voting.service.PollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vote")
@RequiredArgsConstructor
public class PollController {

    private final PollService pollService;

    @PostMapping
    public Poll cretePoll(@RequestBody Poll poll) {
        return pollService.addPoll(poll);
    }

    @GetMapping
    public List<Poll>  findAllPolls() {
        return pollService.findAllPolls();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> findPollById(@PathVariable Long id) {
        return pollService.findByIds(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public void vote(@RequestBody Vote vote) {
        pollService.vote(vote.getPollId(),vote.getOptionIndex());


    }
}
