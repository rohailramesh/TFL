// pages/index.js
import React, { useState, useEffect } from "react";

function LineStatus() {
  const [data, setData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/tubeStatus");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data, lastUpdated } = await response.json();
      setData(data);
      setLastUpdated(lastUpdated);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Fetch data every 5 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 1 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>
        <h1>Line Status</h1>
        <ul>
          {Object.keys(data).map((lineName) => (
            <li key={lineName}>
              <p>
                {lineName}: {data[lineName].State}
              </p>
              <p>{data[lineName].Description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Last Updated: {lastUpdated}</h3>
      </div>
    </>
  );
}

export default LineStatus;
