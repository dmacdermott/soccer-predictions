import React from "react";
import Game from "./Game";

const GameList = ({ matches, weeklyPredStats }) => {
  return (
    <div className="container mx-auto">
      {weeklyPredStats ? (
        <div className="grid grid-cols-2 mx-auto text-center text-sm my-4 auto-cols-auto	">
          <div>Results</div>
          <div>Scores</div>
          <div className="text-xl font-black">
            {(weeklyPredStats.resultPredCorrect / 10) * 100}%
          </div>
          <div className="text-xl font-black">
            {(weeklyPredStats.scorePredCorrect / 10) * 100}%
          </div>
        </div>
      ) : null}

      <div className="flex flex-col justify-center">
        {matches && matches.map(match => <Game key={match.id} match={match} />)}
      </div>
    </div>
  );
};

export default GameList;
