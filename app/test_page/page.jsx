"use client"; // This line marks the component as a client component
import NavBar from "@/components/NavBar.jsx";
import { useEffect } from "react";
import { loadUserData, getUserName } from "./strava.js";

export default function Page() {
  useEffect(() => {
    const userName = getUserName();
    document.getElementById("title").textContent = `${userName}'s Fitness Data`;

    document.title = `Strava Test Page`;
    // Add a log to confirm useEffect execution
    console.log("useEffect triggered in Page component");

    loadUserData();
  }, []); // Ensure useEffect runs only once

  return (
    <div>
      <NavBar />
      <h1 id="title">Fitness Data</h1>
      <div id="data">
        <p id="distance-this-week">Total distance this week:</p>
        <p id="distance-today">Total distance today:</p>
      </div>
    </div>
  );
}
