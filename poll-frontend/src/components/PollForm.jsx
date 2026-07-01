import { useState } from "react";
import api from "../services/api";

function PollForm({ onPollCreated }) {
    // State management for the question string and 4 individual options
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");

    const handleClick = async () => {
        // Validation check: ensure question and at least 2 primary options are entered
        if (!question.trim() || !option1.trim() || !option2.trim()) {
            alert("Please enter a question and at least two options.");
            return;
        }

        // Structuring the exact JSON schema required by your Poll.java backend entity
        const pollPayload = {
            question: question,
            // 'option' matches the exact field name of the List collection in your Java model
            option: [
                { voteOption: option1, voteCount: 0 },
                { voteOption: option2, voteCount: 0 },
                { voteOption: option3, voteCount: 0 },
                { voteOption: option4, voteCount: 0 }
            ].filter(opt => opt.voteOption.trim() !== "") // Clean out any inputs left empty
        };

        console.log("Sending New Poll Data to Backend:", pollPayload);

        try {
            await api.post("", pollPayload);
            alert("Poll Created Successfully!");

            // 1. Reset all state values to clear out the text boxes on your page
            setQuestion("");
            setOption1("");
            setOption2("");
            setOption3("");
            setOption4("");

            // 2. Safely trigger the parent app update to let PollList reload automatically
            if (onPollCreated) {
                onPollCreated();
            }
        } catch (error) {
            console.error("Error creating a new poll:", error);
            alert("Failed to create poll. Check your browser console or your Spring Boot logs.");
        }
    };

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "20px auto",
                padding: "25px",
                border: "1px solid #444",
                borderRadius: "8px",
                backgroundColor: "#1e1e24",
                color: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create New Poll</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label><strong>Question:</strong></label>
                <input
                    type="text"
                    placeholder="e.g., What is your preferred backend language?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={inputStyle}
                />

                <label><strong>Voting Choices (Minimum 2):</strong></label>
                <input
                    type="text"
                    placeholder="Enter choice option 1"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="text"
                    placeholder="Enter choice option 2"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="text"
                    placeholder="Enter choice option 3 (Optional)"
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="text"
                    placeholder="Enter choice option 4 (Optional)"
                    value={option4}
                    onChange={(e) => setOption4(e.target.value)}
                    style={inputStyle}
                />

                <button
                    onClick={handleClick}
                    style={{
                        marginTop: "10px",
                        padding: "12px",
                        backgroundColor: "#0d6efd",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Create Poll
                </button>
            </div>
        </div>
    );
}

// Simple layout formatting configuration object for input elements
const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #555",
    backgroundColor: "#2a2a35",
    color: "#fff",
    fontSize: "14px"
};

export default PollForm;