"use client";

import styles from "./page.module.css";
import StepVisualizer from "@/components/StepVisualizer";

export default function HomeClient({ allUsers, oneUser }) {
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

      <ul>
        <h3>Example of a single user's data from the DB:</h3>
        {oneUser ? (
          <li key={oneUser.id}>
            {oneUser.name} -- Distance travelled: {oneUser.distance_travelled}
          </li>
        ) : (
          <li>Loading...</li>
        )}
      </ul>

      {/* Display a step visualizer of one user on the screen */}
      {oneUser && <StepVisualizer userCharacter={oneUser} />}

    </main>
  );
}
