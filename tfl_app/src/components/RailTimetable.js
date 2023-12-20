import React, { useState, useEffect } from "react";
import axios from "axios";

function RailTimetable() {
  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await axios.get(
        "https://transportapi.com/v3/uk/train/station/DHM/live.json?destination=LST&app_id=84216cb4&app_key=4e8ca11841f82792e9cb3a7e5ffe2620"
      );

      // Process the response data
      const timetableData = response.data;
      setTimetable(timetableData);
      console.log(timetableData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!timetable) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Timetable</h1>
      <ul>
        {timetable.departures.all.map((departure) => (
          <li key={departure.aimed_departure_time}>
            <p>Destination: {departure.destination_name}</p>
            <p>Departure Time: {departure.aimed_departure_time}</p>
            {/* Add more relevant information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RailTimetable;
