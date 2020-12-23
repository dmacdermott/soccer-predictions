import React, { useState, useEffect } from "react";

const Filter = ({ handleMatches }) => {
  //   const [currentWeek, setCurrentWeek] = useState();
  //   const [weeks, setWeeks] = useState();

  //   useEffect(() => {

  //     setWeeks(new Array(38));
  //   }, []);
  return (
    <div>
      <select
        name="week-select"
        id="week-selector"
        className="w-full border bg-white rounded px-3 py-2 outline-none"
        onChange={handleMatches}
      >
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
