"use client"; // This line marks the component as a client component
import NavBar from "@/components/NavBar.jsx";
import { useEffect, useState } from "react";
import { loadUserData, getUserName } from "./strava.js";

export default function Page() {
  const [totalDistanceThisWeek, setTotalDistanceThisWeek] = useState(0);
  const [totalDistanceToday, setTotalDistanceToday] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    const userName = getUserName();
    document.getElementById("title").textContent = `${userName}'s Fitness Data`;

    loadUserData().then((data) => {
      console.log("User data loaded and updated");
      setTotalDistanceThisWeek(data.totalDistanceThisWeek);
      setTotalDistanceToday(data.totalDistanceToday);
      setTotalDistance(data.totalDistance);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <h1 id="title">Fitness Data</h1>
      <div id="data">
        <p id="distance-this-week">
          Total distance this week: {totalDistanceThisWeek} meters
        </p>
        <p id="distance-today">
          Total distance today: {totalDistanceToday} meters
        </p>
        <p id="total-distance">Total distance: {totalDistance} meters</p>{" "}
        {/* Displaying total distance */}
      </div>
    </div>
  );
}
