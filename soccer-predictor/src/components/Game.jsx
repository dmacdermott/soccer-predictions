import React from "react";

const Game = ({ match }) => {
  return (
    <div className="grid grid-cols-3 text-center w-80 mx-auto my-5 shadow-md rounded px-8 py-4 dark:bg-gray-700">
      <div className="col-span-3 text-xs">
        <p>{match.stadium_name}</p>
        <p>
          {match.date} - {match.time}
        </p>
        <p className="py-3">
          Prediction:{" "}
          {match.prediction === 1
            ? match.home_team
            : match.prediction === -1
            ? match.away_team
            : "Draw"}
        </p>{" "}
      </div>
      <div className="col">
        <img className="w-8 mx-auto" src={match.home_image}></img>
        <p className="text-sm">{match.home_team}</p>{" "}
      </div>
      <div className="col self-center">
        {match.status === "complete" ? (
          <p className="text-xs">
            {match.homeGoalCount} - {match.awayGoalCount}
          </p>
        ) : null}
        <p className="text-lg font-extrabold">
          {match.home_score} - {match.away_score}
        </p>
      </div>
      <div className="col">
        <img className="w-8 mx-auto" src={match.away_image}></img>
        <p className="text-sm">{match.away_team}</p>
      </div>
    </div>
  );
};

export default Game;
