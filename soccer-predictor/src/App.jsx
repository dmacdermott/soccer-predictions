import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import GameList from "./components/GameList";
import Blink from "react-blink-text";

function App() {
  const [matches, setMatches] = useState();
  const [dark, setDark] = useState(false);
  const [leagueStats, setLeagueStats] = useState();
  const [gameWeek, setGameWeek] = useState();
  const [weeklyPredStats, setWeeklyPredStats] = useState();
  const [refresh, setRefresh] = useState(false);

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
      handleWeeklyPredStats(res.data);
    });
  };

  const handleCurrentMatches = week => {
    axios.get(`/matches/${week}`).then(res => {
      setMatches(res.data);
      handleWeeklyPredStats(res.data);
    });
  };

  const handleRefresh = () => {
    setRefresh(true);
    axios.get(`/get_data`).then(res => {
      setRefresh(false);
    });
  };

  const handleWeeklyPredStats = weeklyGames => {
    let scorePredCorrect = 0;
    let resultPredCorrect = 0;
    for (let i = 0; i < weeklyGames.length; i++) {
      if (
        weeklyGames[i].homeGoalCount === weeklyGames[i].home_score &&
        weeklyGames[i].awayGoalCount === weeklyGames[i].away_score &&
        weeklyGames[i].homeGoalCount
      ) {
        scorePredCorrect++;
      }

      if (
        weeklyGames[i].homeGoalCount > weeklyGames[i].awayGoalCount &&
        weeklyGames[i].prediction === 1 &&
        weeklyGames[i].homeGoalCount
      ) {
        resultPredCorrect++;
      } else if (
        weeklyGames[i].homeGoalCount < weeklyGames[i].awayGoalCount &&
        weeklyGames[i].prediction === -1 &&
        weeklyGames[i].homeGoalCount
      ) {
        resultPredCorrect++;
      } else if (
        weeklyGames[i].homeGoalCount === weeklyGames[i].awayGoalCount &&
        weeklyGames[i].prediction === 0 &&
        weeklyGames[i].homeGoalCount
      ) {
        resultPredCorrect++;
      }
    }
    setWeeklyPredStats({
      scorePredCorrect: scorePredCorrect,
      resultPredCorrect: resultPredCorrect,
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
      <div className="relative w-full">
        <div
          className="absolute top-0 right-0 h-8 w-8 m-2 cursor-pointer"
          onClick={handleDarkMode}
        >
          {dark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className=""
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
        <div
          className="absolute top-0 left-0 h-8 w-8 m-2 cursor-pointer"
          onClick={handleRefresh}
        >
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
          {refresh && <Blink text="Downloading.." fontSize="0.5rem"></Blink>}
        </div>
      </div>

      <header className="text-2xl text-center py-5">Game Predictor</header>

      <Filter handleMatches={handleMatches} leagueStats={leagueStats} />

      <GameList matches={matches} weeklyPredStats={weeklyPredStats} />
    </div>
  );
}

export default App;
