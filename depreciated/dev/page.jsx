"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [distance, setDistance] = useState("");

  // Use the existing getAllUsers function with useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getAllUsers");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Fetch users error", error);
      }
    };

    fetchUsers();
  }, []);

  // Form
  const handleSubmit = async (event) => {
    // event.preventDefault();

    try {
      // Updates the distance / gold
      const response = await fetch("/api/noStravaUpdater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: selectedUser, distance }),
      });

      const result = await response.json();
    } catch (error) {
      console.error("Error updating distance:", error);
    }
  };

  return (
    <div>
      <NavBar showLogin={false} />
      <p>Add Distance / Gold</p>
      <p>Does not affect distance_travelled_today only totals</p>
      <form onSubmit={handleSubmit}>
        <label>
          Select User:
          {/* Cool drop down menu */}
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Distance:
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
