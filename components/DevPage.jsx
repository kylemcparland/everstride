import { useState, useEffect } from "react";
import "./DevPage.css";

const DevPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [distance, setDistance] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/userUpdater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: selectedUser,
          distance: parseFloat(distance),
        }),
      });

      const result = await response.json();
      console.log(result.message);
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating distance:", error);
    }
  };

  return (
    <div className="container">
      <p>Add a new workout</p>
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DevPage;
