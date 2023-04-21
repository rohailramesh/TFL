import React, { useState, useEffect } from "react";
import LineInfo from "@/components/LineInfo";
import Timetable from "@/components/Timetable";
import LineStatus from "@/components/LineStatus";

function Home() {
  return (
    <>
      {/* <LineInfo /> */}
      {/* <Timetable /> */}
      <LineStatus />
    </>
  );
}

export default Home;
