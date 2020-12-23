import React from "react";

const Game = ({ match }) => {
  return (
    <div>
      <h1>{match && match.home_team}</h1>
    </div>
  );
};

export default Game;
