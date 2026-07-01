import { useState } from 'react';
import Header from "./components/Header";
import PollForm from "./components/PollForm"
import PollList from "./components/PollList"

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
        }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif"}}>
    <Header/>
    <PollForm onPollCreated={handleRefresh}/>
    <PollList refreshTrigger={refreshTrigger}/>
    </div>
    );
}
export default App;
