"use client";
import './test_page.css'
import NavBar from "@/components/NavBar.jsx";
import { useEffect, useState } from "react";
import { loadUserData, getUserName } from "./strava.js";

export default function Page() {
  const [totalDistanceToday, setTotalDistanceToday] = useState(0);
  const [totalDistanceThisWeek, setTotalDistanceThisWeek] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    const userName = getUserName();
    document.getElementById(
      "title"
    ).textContent = `Strava data for user: (${userName})`;
    // Getting userName from strava.js

    loadUserData()
      .then((data) => {
        if (data) {
          console.log("loadUserData");
          setTotalDistanceToday(data.totalDistanceToday);
          setTotalDistanceThisWeek(data.totalDistanceThisWeek);
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
      <NavBar showLogin={false} />
      <div id="data">
        <li>(API user is read from strava.js)</li>
        <li id="title"></li>
        <li id="distance-today">
          Total distance today: {totalDistanceToday} meters
        </li>
        <li id="distance-this-week">
          Total distance this week: {totalDistanceThisWeek} meters
        </li>
        <li id="total-distance">
          Total distance since sign-up: {totalDistance} meters
        </li>
      </div>
    </div>
  );
}
