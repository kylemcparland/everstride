"use client";
import "./test_page.css";
import NavBar from "@/components/NavBar.jsx";
import { useEffect, useState } from "react";
import { loadUserData, getUserName } from "./strava.js";

export default function Page() {
  const [totalDistanceToday, setTotalDistanceToday] = useState(0);
  const [totalDistanceThisWeek, setTotalDistanceThisWeek] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [users, setUsers] = useState([]); // State for users list
  const [selectedUser, setSelectedUser] = useState(""); // State for selected user
  const [distanceToAdd, setDistanceToAdd] = useState(""); // State for distance to add

  useEffect(() => {
    const userName = getUserName();
    document.getElementById(
      "title"
    ).textContent = `API Strava Connected: (${userName})`;

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

    // Fetch the list of users from the API
    fetch("/api/getAllUsers")
      .then((response) => response.json())
      .then((users) => setUsers(users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedUser && distanceToAdd) {
      console.log(`User: ${selectedUser}, Distance to add: ${distanceToAdd}`);

      // Update total distance and distance today for the selected user
      fetch("/api/updateTotalDistance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: selectedUser,
          distanceToAdd: distanceToAdd,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          console.log(
            "Total distance and distance today updated successfully!"
          );
        })
        .catch((error) => {
          console.error(
            "Error updating total distance and distance today:",
            error
          );
        });
    } else {
      console.error("Please select a user and enter a distance.");
    }
  };

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
      {/* Add the form below */}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="user-select">Select User</label>
          <select
            id="user-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="distance-to-add">Distance to Add (meters)</label>
          <input
            type="number"
            id="distance-to-add"
            value={distanceToAdd}
            onChange={(e) => setDistanceToAdd(e.target.value)}
          />
        </div>
        <button type="submit">Update Distance</button>
      </form>
    </div>
  );
}
