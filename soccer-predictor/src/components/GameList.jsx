import React from "react";
import Game from "./Game";

const GameList = ({ matches }) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center">
        {matches && matches.map(match => <Game key={match.id} match={match} />)}
      </div>
    </div>
  );
};

export default GameList;
