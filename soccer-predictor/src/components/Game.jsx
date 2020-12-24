import React from "react";

const Game = ({ match }) => {
  return (
    <div className="grid grid-cols-3 text-center w-80 mx-auto my-5 shadow-md rounded px-8 py-4 dark:bg-gray-700">
      <div className="col-span-3 text-xs ">
        <p>
          {" "}
          <span className="inline-block w-3 mr-2">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          {match.stadium_name}
        </p>
        <p>
          <span className="inline-block w-3 mr-2">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          {match.date} - {match.time}
        </p>
        <p
          className={`result-pred inline-block px-2 py-1 rounded  my-3 ${
            match.pred_result === true
              ? "correct"
              : match.pred_result === false
              ? "incorrect"
              : ""
          }`}
        >
          <span className="inline-block w-3 mr-2">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </span>
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
          <p
            className={`score-pred text-xs inline-grid px-2 py-1 rounded ${
              match.score_result === true
                ? "correct"
                : match.score_result === false
                ? "incorrect"
                : ""
            }`}
          >
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
