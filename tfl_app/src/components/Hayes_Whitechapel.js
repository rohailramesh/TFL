// import React, { useState, useEffect } from "react";

// function HayesToWhitechapel() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const socket = new WebSocket(
//       "wss://api.tfl.gov.uk/TrackerNet/PredictionWebSocket"
//     );

//     socket.onopen = () => {
//       socket.send(
//         JSON.stringify({
//           $type:
//             "Tfl.Api.Presentation.Entities.SubscriptionMessage, Tfl.Api.Presentation.Entities",
//           stopId: "910GHAYESAH",
//         })
//       );
//     };

//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);

//       if (
//         message.$type ===
//         "Tfl.Api.Presentation.Entities.Prediction, Tfl.Api.Presentation.Entities"
//       ) {
//         const updatedData = data.map((journey) => {
//           if (journey.legs[0].departurePoint.naptanId === message.naptanId) {
//             return {
//               ...journey,
//               legs: [
//                 {
//                   ...journey.legs[0],
//                   departureTime: message.timestamp,
//                 },
//               ],
//             };
//           } else {
//             return journey;
//           }
//         });

//         setData(updatedData);
//       }
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   console.log(data);

//   return (
//     <div>
//       <h1>Journey Information</h1>
//       {data.length > 0 ? (
//         <div>
//           {data.map((journey, index) => (
//             <div key={index}>
//               <p>Departure Point: {journey.startDateTime}</p>
//               <p>Arrival Point: {journey.arrivalDateTime}</p>
//               <p>Duration: {journey.duration} minutes</p>
//               <p>Total cost: £{journey.fare.totalCost / 100}</p>
//               <p>Stops:</p>
//               <ul>
//                 {journey.legs[0].path.stopPoints.map((stop) => (
//                   <li key={stop.id}>{stop.name}</li>
//                 ))}
//               </ul>
//               {journey.legs[0].departureTime && (
//                 <p>Updated Departure Time: {journey.legs[0].departureTime}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default HayesToWhitechapel;

import React, { useState, useEffect } from "react";

function HayesToWhitechapel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.tfl.gov.uk/Journey/JourneyResults/910GHAYESAH/to/940GZZLUWPL?timeIs=Arriving&journeyPreference=LeastInterchange&walkingSpeed=Slow&cyclePreference=None",
      {
        method: "GET",
        // Request headers
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.journeys); // Update state with the received data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  return (
    <div>
      <h1>Journey Information</h1>
      {data.length > 0 ? (
        <div>
          {data.map((journey, index) => (
            <div key={index}>
              <p>Departure Point: {journey.startDateTime}</p>
              <p>Arrival Point: {journey.arrivalDateTime}</p>
              <p>Duration: {journey.duration} minutes</p>
              <p>Total cost: £{journey.fare.totalCost / 100}</p>
              <p>Stops:</p>
              <ul>
                {journey.legs[0].path.stopPoints.map((stop) => (
                  <li key={stop.id}>{stop.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default HayesToWhitechapel;
