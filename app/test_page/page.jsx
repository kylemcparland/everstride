"use client";
import './test_page.css'
import NavBar from "@/components/NavBar.jsx";
import { useEffect, useState } from "react";
import { loadUserData, getUserName } from "./strava.js";
// Note: do not try to put a manual database update form on this page, it does not work. If anything make it all brand new and separate on a different page, with different DB updating api than the ones being used here.

export default function Page() {
  const [totalDistanceToday, setTotalDistanceToday] = useState(0);
  const [totalDistanceThisWeek, setTotalDistanceThisWeek] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    const userName = getUserName();
    document.getElementById(
      "title"
    ).textContent = `API Strava Connected: (${userName})`;
    // Getting userName from stravaUserInfo.js

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
        <li>API user located in stravaUserInfo.js</li>
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
