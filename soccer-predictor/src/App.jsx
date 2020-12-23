import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import GameList from "./components/GameList";

function App() {
  const [matches, setMatches] = useState();
  // const [week, setWeek] = useState();

  // HANDLERS

  // const handleWeek = event => {
  //   setWeek(event.target.value);
  // };

  const handleMatches = event => {
    let week = event.target.value;
    axios.get(`/matches/${week}`).then(res => {
      console.log(res.data);
      setMatches(res.data);
    });
  };

  // useEffect(() => {
  //   axios.get("/matches").then(res => setTest(res.data));
  // }, []);

  return (
    <div className="App">
      <header>Game Predictor</header>
      <Filter handleMatches={handleMatches} />
      <GameList matches={matches} />
    </div>
  );
}

export default App;
