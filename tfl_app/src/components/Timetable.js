import React, { useState, useEffect } from "react";

function Timetable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.tfl.gov.uk/Line/elizabeth/Timetable/HUBZWL/to/HUBTCR", {
      method: "GET",
      // Request headers
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.stations); // Log only the stations array
        setData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div>
        <h1>Timetable Information</h1>
        <ul>
          {data.stations &&
            data.stations.map((station) => (
              <li key={station.stationId}>
                {station.name} &nbsp; {station.lat}, {station.lon}
                <ul>
                  {station.lines &&
                    station.lines.map((line) => (
                      <li key={line.id}>{line.name}</li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Timetable;
