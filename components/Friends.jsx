import { useState, useEffect } from "react";
import "./FriendsUserCards.css";
import { getLocation } from "@/pages/api/location";

// currentUserId is passed in from NavLinks.jsx
const Friends = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);

  // Load all users from database -- Added a call to the api that checks the database to see if you are already friends with a user or not and display the add or remove button conditionally

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getAllUsers");
        const data = await response.json();
        const usersWithIds = await Promise.all(
          data.map(async (user) => {
            const res = await fetch(`/api/getUserID?name=${user.name}`);
            const userIdData = await res.json();
            const friendStatusRes = await fetch(`/api/checkFriendStatus`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId1: currentUserId,
                userId2: userIdData.id,
              }),
            });
            const friendStatusData = await friendStatusRes.json();
            return {
              ...user,
              id: userIdData.id,
              isFriend: friendStatusData.isFriend,
            };
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
  const handleAddFriend = async (userId) => {
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

  // Remove friend button
  const handleRemoveFriend = async (userId) => {
    try {
      const response = await fetch("/api/removeFriend", {
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
      handleAddFriend={handleAddFriend}
      handleRemoveFriend={handleRemoveFriend}
    />
  );
};

const UserCards = ({
  users,
  currentUserId,
  handleAddFriend,
  handleRemoveFriend,
}) => {
  return (
    <div className="container">
      <h2>Users</h2>
      <div className="users">
        {users
          .filter((user) => user.id !== currentUserId)
          .map((user) => (
            <div className="card" key={user.id}>
              <div className="details">
                <h3>{user.name}</h3>
                <p>Distance: {user.total_distance_travelled}m</p>
                <p>Location: {getLocation(user.total_distance_travelled)}</p>
              </div>
              <div className="buttonsContainer">
                <button
                  className="Remove"
                  onClick={() => handleRemoveFriend(user.id)}
                  disabled={!user.isFriend}
                >
                  Remove Friend
                </button>
                <button
                  className="Add"
                  onClick={() => handleAddFriend(user.id)}
                  disabled={user.isFriend}
                >
                  Add Friend
                </button>
              </div>
              <div className="avatar"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Friends;
