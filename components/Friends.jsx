import { useState, useEffect } from "react";
import "./Friends.css";

// currentUserId is passed in from NavLinks.jsx
const Friends = ({ currentUserId }) => {
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

    if (currentUserId) {
      fetchUsers();
    }
  }, [currentUserId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedUser === "") {
      alert("Choose someone to add as a friend");
      return;
    }

    try {
      const response = await fetch("/api/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId1: currentUserId,
          userId2: selectedUser,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      window.location.reload();
    } catch (error) {
      alert("Failed");
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
            {users
              .filter((user) => user.id !== currentUserId) // Filter out the current user
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {`${user.name} (${user.id})`}
                </option>
              ))}
          </select>
        </label>
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
};

export default Friends;
