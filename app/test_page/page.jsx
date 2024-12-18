"use client";
import NavBar from "@/components/NavBar.jsx";
import { useEffect, useState } from "react";
import { loadUserData, getUserName } from "./strava.js";

export default function Page() {
  const [totalDistanceToday, setTotalDistanceToday] = useState(0);
  const [totalDistanceThisWeek, setTotalDistanceThisWeek] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    const userName = getUserName();
    document.getElementById("title").textContent = `${userName}'s Fitness Data`;

    loadUserData()
      .then((data) => {
        if (data) {
          console.log("loadUserData");
          setTotalDistanceToday(data.totalDistanceToday);setTotalDistanceThisWeek(data.totalDistanceThisWeek);
          setTotalDistance(data.totalDistance);
        } else {
          console.error("loadUserData in page.jsx failed.");
        }
      })
      .catch((error) => {
        console.error("loadUserData error:", error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h1 id="title">Fitness Data</h1>
      <div id="data">
        <p id="distance-today">
          Total distance today: {totalDistanceToday} meters
        </p>
        <p id="distance-this-week">
          Total distance this week: {totalDistanceThisWeek} meters
        </p>
        <p id="total-distance">Total distance: {totalDistance} meters</p>{" "}
      </div>
    </div>
  );
}
