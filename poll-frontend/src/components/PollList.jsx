import { useEffect, useState } from "react";
import api from "../services/api";

function PollList({ refreshTrigger }) {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch Polls from Spring Boot Backend
    const loadPolls = async () => {
        try {
            setLoading(true);
            const response = await api.get("");

            // This log prints out the exact array structure coming from MySQL
            console.log("Fetched Polls Array:", response.data);

            setPolls(response.data);
        } catch (error) {
            console.error("Error fetching polls from backend:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Send the Vote Payload to the Backend
    const handleVote = async (pollId, index) => {
        // Safe check: If the frontend failed to grab an ID, stop before hitting the API
        if (!pollId) {
            alert("Error: Could not resolve Poll ID. Check browser console.");
            console.error("handleVote aborted: pollId is missing or undefined.");
            return;
        }

        const votePayload = {
            pollId: pollId,
            optionIndex: index
        };

        console.log("Sending Vote Payload to /api/poll/vote:", votePayload);

        try {
            await api.post("/vote", votePayload);
            // Refresh the list immediately so vote numbers increment on screen
            loadPolls();
        } catch (error) {
            console.error("Error casting vote to backend:", error);
            alert("Failed to save vote. Check backend logs for a 500 error.");
        }
    };

    // 3. Automatically run loadPolls when component mounts or when refreshTrigger updates
    useEffect(() => {
        loadPolls();
    }, [refreshTrigger]);

    if (loading) {
        return <div style={{ textAlign: "center", padding: "20px" }}>Loading polls...</div>;
    }

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Active Polls</h2>

            {polls.length === 0 ? (
                <p style={{ textAlign: "center", color: "#888" }}>No polls available yet.</p>
            ) : (
                polls.map((poll) => {
                    // CRITICAL FIX: Dynamically check both 'id' and 'pollId'
                    // to ensure we never pass 'undefined' to the backend service.
                    const dynamicPollId = poll.id || poll.pollId;

                    return (
                        <div
                            key={dynamicPollId || Math.random()}
                            style={{
                                border: "1px solid #444",
                                padding: "20px",
                                margin: "15px 0",
                                borderRadius: "8px",
                                backgroundColor: "#1e1e24",
                                color: "#fff"
                            }}
                        >
                            {/* Target the singular 'question' property matching your Poll.java entity */}
                            <h3 style={{ marginBottom: "15px" }}>{poll.question}</h3>

                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {/* Target the singular 'option' list matching your Poll.java collection */}
                                {poll.option && poll.option.map((opt, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleVote(dynamicPollId, index)}
                                        style={{
                                            padding: "10px",
                                            textAlign: "left",
                                            borderRadius: "5px",
                                            border: "1px solid #555",
                                            backgroundColor: "#2a2a35",
                                            color: "#fff",
                                            cursor: "pointer",
                                            transition: "background 0.2s"
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = "#3a3a45"}
                                        onMouseOut={(e) => e.target.style.backgroundColor = "#2a2a35"}
                                    >
                                        <strong>{opt.voteOption}</strong>
                                        <span style={{ float: "right", color: "#aaa" }}>
                                            ({opt.voteCount || 0} votes)
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default PollList;