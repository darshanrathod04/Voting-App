import {useState } from "react";
import api from "../services/api"

function PollForm(){
    const [question, setQuestion]= useState("");
    const [option1, setOption1]= useState("");
    const [option2, setOption2]= useState("");
    const [option3, setOption3]= useState("");
    const [option4, setOption4]= useState("");

    const handleClick = async() => {
        const poll = {
            question:question,
            option: [
                {
                    voteOption: option1
                    },

                {
                                    voteOption: option2
                                    },
                                {
                                                    voteOption: option3
                                                    },
                                                {
                                                                  voteOption: option4
                                                                     },

                ]


            };
         await api.post("",poll);
         alert ("poll Created Successfully");
        }




    return (
        <>
        <h2> Create Poll </h2>
        <input type= "text"  placeholder = "enter question" value={question} onChange={(event) => setQuestion (event.target.value)} />
        <input type= "text"  placeholder = "enter option1" value={option1} onChange={(event) => setOption1(event.target.value)} />
        <input type= "text"  placeholder = "enter option2" value={option2} onChange={(event) => setOption2 (event.target.value)} />
        <input type= "text"  placeholder = "enter option3" value={option3} onChange={(event) => setOption3 (event.target.value)} />
        <input type= "text"  placeholder = "enter Option4" value={option4} onChange={(event) => setOption4 (event.target.value)} />

        <button onClick={handleClick} >
            Create Poll
            </button>


        </>
        );
    }

export default PollForm;