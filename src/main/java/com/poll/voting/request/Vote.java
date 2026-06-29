package com.poll.voting.request;

import com.poll.voting.model.Poll;
import lombok.Data;

@Data
public class Vote {

    private Long PollId;

    private int OptionIndex;
}
