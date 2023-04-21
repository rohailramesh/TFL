import React, { useState, useEffect } from "react";

let uniqueKeyCounter = 0; //since this data does not have an 'id' to be used we just use a counter to increment for each item

function LineStatus() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.tfl.gov.uk/Line/Mode/tube/Disruption", {
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
        console.log(data);
        setData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div>
        <h1>Line Status</h1>
        <ul>
          {data.map((item) => (
            <li>
              <p key={uniqueKeyCounter++}>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>All other lines: Normal service</h3>
      </div>
    </>
  );
}

export default LineStatus;
