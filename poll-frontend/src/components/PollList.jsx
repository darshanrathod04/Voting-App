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

                    <div key={poll.id}>

                        <h3>{poll.questions}</h3>

                        {
                            poll.options.map((option, index) => (

                                <p key={index}>

                                    {option.voteOption}

                                </p>

                            ))
                        }

                    </div>

                ))
            }
             </>
          );
}
export default PollList;
