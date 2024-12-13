import styles from "./page.module.css";
import { fetchAllUsers } from "./helpers/fetchAllUsers";
import { fetchUserByName } from "./helpers/fetchUserByName";

export default async function Home() {
  const allUsers = await fetchAllUsers();
  const oneUser = await fetchUserByName("Kyle McParland");

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
        Example of a single user's data from the DB: {oneUser.name}:{" "}
        {oneUser.distance_travelled}
      </h3>
    </main>
  );
}
