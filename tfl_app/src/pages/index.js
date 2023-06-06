import React, { useState, useEffect } from "react";
import LineInfo from "@/components/LineInfo";
import Timetable from "@/components/Timetable";
import LineStatus from "@/components/LineStatus";
import HayesToWhitechapel from "@/components/Hayes_Whitechapel";

function Home() {
  return (
    <>
      {/* <LineInfo />
      <Timetable />
      <LineStatus /> */}
      <HayesToWhitechapel />
    </>
  );
}

export default Home;
