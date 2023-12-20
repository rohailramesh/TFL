import React, { useState, useEffect } from "react";
import LineInfo from "@/components/LineInfo";
import Timetable from "@/components/Timetable";
import LineStatus from "@/components/LineStatus";
import HayesToWhitechapel from "@/components/Hayes_Whitechapel";
import RailTimetable from "@/components/RailTimetable";

function Home() {
  return (
    <>
      {/* <LineInfo /> */}
      {/* <Timetable /> */}
      <LineStatus />
      <HayesToWhitechapel />
      {/* <RailTimetable /> */}
    </>
  );
}

export default Home;
