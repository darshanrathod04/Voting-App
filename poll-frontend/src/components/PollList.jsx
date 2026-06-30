import {useEffect, useState} from "react";
import api from "../services/api";

function PollList(){

const [polls, setPolls] = useState([]);
const loadPolls = async () => {
    const response = await api.get("");

    setPolls(response.data);

    };
useEffect(() => {
    loadPolls ();
    },
[]);
return (
           <>
            {
               polls.map((poll) => (
                   <h2 key= {poll.id}>
                       {poll.question}
                       </h2>

                   ))
                }
             </>
           );
}
export default PollList;
