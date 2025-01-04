import { useState, useEffect } from "react";
import "./Friends.css";

// currentUserId is passed in from NavLinks.jsx
const Friends = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // Load all users from database
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

  // Add friend button
  const handleSubmit = async (userId) => {
    try {
      const response = await fetch("/api/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId1: currentUserId,
          userId2: userId,
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
    <UserCards
      users={users}
      currentUserId={currentUserId}
      handleSubmit={handleSubmit}
    />
  );
};

const UserCards = ({ users, currentUserId, handleSubmit }) => {
  return (
    <div className="container">
      <p>Users</p>
      <div className="users">
        {users
          .filter((user) => user.id !== currentUserId)
          .map((user) => (
            <div className="card" key={user.id}>
              <h3>Name: {user.name}</h3>
              <p>ID: (Don't really need)</p>
              <p>Distance: (Distance run total?)</p>
              <p>Location: (Location in game)</p>
              <button onClick={() => handleSubmit(user.id)}>Add Friend</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Friends;
