import { useState, useEffect } from "react";
import "./Friends.css";

const Friends = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getAllUsers");
        const data = await response.json();
        const usersWithIds = await Promise.all(
          data.map(async (user) => {
            const res = await fetch(`/api/getUserID?name=${user.name}`);
            const userIdData = await res.json();
            return { ...user, id: userIdData.id };
          })
        );
        setUsers(usersWithIds);
      } catch (error) {
        console.error("Fetch users error", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/noStravaUpdater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: selectedUser, distance }),
      });

      const result = await response.json();
      console.log(result.message);

      // Then reset/reload to the home page to see the updates.
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating distance:", error);
    }
  };

  return (
    <div className="container">
      <p>Users</p>
      <form onSubmit={handleSubmit}>
        <label>
          Select User:
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {`${user.name} (${user.id})`}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Friends;
