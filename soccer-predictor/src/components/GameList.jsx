import React from "react";
import Game from "./Game";

const GameList = ({ matches }) => {
  return <div>{matches && matches.map(match => <Game match={match} />)}</div>;
};

export default GameList;
