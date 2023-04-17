import React, { useState, useEffect } from "react";

function LineInfo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.tfl.gov.uk/Line/Search/hammersmith?serviceTypes=Regular")
      .then((response) => response.json())
      .then((data) => {
        setData(data.searchMatches);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(data);
  return (
    <div>
      <h1>Line Information</h1>
      <ul>
        {data.map((match) => (
          <li key={match.lineId}>
            <h2>{match.lineName}</h2>
            <ul>
              {match.lineRouteSection.map((section) => (
                <li key={section.naptanId}>
                  <p>{section.direction}</p>
                  <p>{section.fromStation}</p>
                  <p>{section.toStation}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LineInfo;
