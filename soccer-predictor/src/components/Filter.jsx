import React, { useState, useEffect } from "react";

const Filter = ({ handleMatches, leagueStats }) => {
  //   const [currentWeek, setCurrentWeek] = useState();
  //   const [weeks, setWeeks] = useState();

  return (
    <div>
      <select
        name="week-select"
        id="week-selector"
        className="w-60 border bg-white rounded px-3 py-2 outline-none block mx-auto dark:text-black"
        onChange={handleMatches}
      >
        <option value="" hidden></option>
        {Array.from(Array(38).keys()).map(week => {
          return (
            <option className="py-1" key={week + 1} value={week + 1}>
              Week {week + 1}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
