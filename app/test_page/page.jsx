"use client"; // This line marks the component as a client component
import NavBar from "@/components/NavBar.jsx";
import { useEffect } from "react";
import { loadUserData, getUserName } from "./strava.js";

export default function Page() {
  useEffect(() => {
    const userName = getUserName();
    document.getElementById("title").textContent = `${userName}'s Fitness Data`;

    loadUserData();
  }, []);

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
