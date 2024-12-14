// import styles from "./page.module.css";
// import { fetchAllUsers } from "./helpers/fetchAllUsers";
// import { fetchUserByName } from "./helpers/fetchUserByName";

// export default async function Home() {
//   const allUsers = await fetchAllUsers();
//   const oneUser = await fetchUserByName("Kyle McParland");

//   return (
//     <main className={styles.main}>
//       <ul>
//         <h3>Example of all users' data from the DB:</h3>
//         {allUsers.map((user) => (
//           <li key={user.id}>
//             {user.name} -- Distance travelled: {user.distance_travelled}
//           </li>
//         ))}
//       </ul>

//       <h3>
//         Example of a single user's data from the DB: {oneUser.name}:{" "}
//         {oneUser.distance_travelled}
//       </h3>
//     </main>
//   );
// }
"use client"; // This line marks the component as a client component

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StepVisualizer from "./step_visualizer/page";

export default function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [oneUser, setOneUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const responseAllUsers = await fetch("/api/getAllUsers");
      const allUsers = await responseAllUsers.json();
      setAllUsers(allUsers);

      const responseOneUser = await fetch(
        "/api/getUserByName?name=Kyle%20McParland"
      );
      const oneUser = await responseOneUser.json();
      setOneUser(oneUser);
    }
    fetchData();
  }, []); // Dependency array is empty, so this effect will only run once after the initial render

  return (
    <main className={styles.main}>
      <ul>
        <h3>Example of all users' data from the DB:</h3>
        {allUsers.map((user) => (
          <li key={user.id}>
            {user.name} -- Distance travelled: {user.distance_travelled}
          </li>
        ))}
      </ul>

      <h3>
        Example of a single user's data from the DB: {oneUser?.name}:{" "}
        {oneUser?.distance_travelled}
      </h3>

      {oneUser && <StepVisualizer userCharacter={oneUser} />}
    </main>
  );
}
