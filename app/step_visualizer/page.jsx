import styles from "./page.module.css";
import StepVisualizer from "@/components/step_visualizer";
import { fetchUserAndFriends } from "../helpers/fetchUserAndFriends";

export default async function StepVisualizerTestPage() {
  // Fetch user & friends data dynamically on the server-side before rendering the page...
  const username = "Ben Hallam"; /* Update this name to set a different user as the current user for testing */
  const usersArray = await fetchUserAndFriends(username);
  const currentUser = usersArray.splice(usersArray[0], 1);

  // Render StepVisualizer component and pass it the user's data...
  return (
    <main className={styles.stepVisualizerContainer}>
      {/* Render current user at top */}
      <StepVisualizer userCharacter={currentUser[0]} key={currentUser.id} />
      {/* Render user's friends below */}
      {usersArray.map((user) => (
        <StepVisualizer userCharacter={user} key={user.id} />
      ))}
    </main>
  );
}
