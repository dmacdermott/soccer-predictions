import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import GameList from "./components/GameList";
import darkIcon from "./dark.svg";
import lightIcon from "./light.svg";

function App() {
  const [matches, setMatches] = useState();
  const [dark, setDark] = useState(false);
  const [leagueStats, setLeagueStats] = useState();
  const [gameWeek, setGameWeek] = useState();

  const handleDarkMode = () => {
    setDark(prev => !prev);
    dark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  };

  const handleMatches = event => {
    let week = event.target.value;
    axios.get(`/matches/${week}`).then(res => {
      setMatches(res.data);
    });
  };

  const handleCurrentMatches = week => {
    axios.get(`/matches/${week}`).then(res => {
      setMatches(res.data);
    });
  };

  useEffect(() => {
    // load current weeks predictions
    axios
      .get("/leaguestats")
      .then(res => {
        setLeagueStats(res.data);
        return res.data.data.game_week;
      })
      .then(week => handleCurrentMatches(week));
  }, []);

  return (
    <div className="App dark:bg-gray-800 dark:text-white">
      <div className="relative h-32 w-32 ...">
        <div
          className="absolute top-0 right-0 h-16 w-16 ..."
          onClick={handleDarkMode}
        >
          {dark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </div>
      </div>

      <header className="text-xl text-center">Game Predictor</header>

      <Filter handleMatches={handleMatches} leagueStats={leagueStats} />

      <GameList matches={matches} />
    </div>
  );
}

export default App;
