// pages/api/tubeStatus.js
import axios from "axios";

const API_URL =
  "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,elizabeth-line/status";

const parseApiResponse = (response) => {
  const dataDict = {};
  for (const line of response) {
    try {
      const statuses = line.lineStatuses.map(
        (status) => status.statusSeverityDescription
      );
      const state =
        statuses.length > 0
          ? [...new Set(statuses)].sort().join(" + ")
          : "Good Service";

      const reason =
        state === "Good Service"
          ? "Nothing to report"
          : line.lineStatuses.map((status) => status.reason).join(" *** ");

      dataDict[line.name] = { State: state, Description: reason };
    } catch (error) {
      dataDict[line.name] = {
        State: null,
        Description: "Error parsing API data",
      };
    }
  }
  return dataDict;
};

export default async function handler(req, res) {
  try {
    const response = await axios.get(API_URL);
    const data = parseApiResponse(response.data);
    const lastUpdated = new Date().toLocaleString();
    res.status(200).json({ data, lastUpdated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
