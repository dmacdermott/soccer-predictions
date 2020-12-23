import React from "react";

const Game = ({ match }) => {
  return (
    <div className="grid grid-cols-3 text-center w-80 mx-auto my-5">
      <div className="col-span-3 text-xs">
        <p>{match.stadium_name}</p>
        <p>{match.date}</p>
        <p>{match.time}</p>
        <p>
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
        <p className="">{match.home_team}</p>{" "}
      </div>
      <div className="col self-center">
        {match.status === "complete" ? (
          <p className="">
            {match.homeGoalCount} - {match.awayGoalCount}
          </p>
        ) : null}
        {match.home_score} - {match.away_score}
      </div>
      <div className="col">
        <img className="w-8 mx-auto" src={match.away_image}></img>
        <p className="">{match.away_team}</p>
      </div>
    </div>
  );
};

export default Game;
