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

// Actual list of available users
//   return (
//     <div className="container">
//       <p>Users</p>
//       <form onSubmit={handleSubmit}>
//         {/* <select> forms a drop down list */}
//         <label>
//           Select User:
//           <select
//             value={selectedUser}
//             onChange={(e) => setSelectedUser(e.target.value)}
//           >
//             <option value="">Select a user</option>
//             {users
//             // Simple filter to not show yourself in the list
//               .filter((user) => user.id !== currentUserId) 
//               .map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {`${user.name} (${user.id})`}
//                 </option>
//               ))}
//           </select>
//         </label>
//         <button type="submit">Add Friend</button>
//       </form>
//     </div>
//   );
// };
// Replacing the drop down list with static user cards
return (
  <UserCards />
)
}

const UserCards = () => {
return (
  <div className = 'container'>
    <p>Users</p>
    <div className = 'users'>
      <div className = 'card'>
        <h3>Name: </h3>
        <p>ID: </p>
        <p>Distance: </p>
        <p>Location: </p>
        <button></button>
      </div>
    </div>
  </div>
);
}


export default Friends;
