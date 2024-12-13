import styles from "./page.module.css";
import StepVisualizer from "@/components/step_visualizer";
import { fetchUserByName } from "@/app/helpers/api";

export default async function Test() {
  // Fetch user data on the server-side before rendering the page...
  const userCharacter = await fetchUserByName("Kyle McParland");
  const userCharacter2 = await fetchUserByName("Ben Hallam");
  const userCharacter3 = await fetchUserByName("Jon Hiebert");
  // Render StepVisualizer component and pass it the user's data...
  return (
    <main className={styles.stepVisualizerContainer}>
      <StepVisualizer userCharacter={userCharacter} />
      <StepVisualizer userCharacter={userCharacter2} />
      <StepVisualizer userCharacter={userCharacter3} />
    </main>
  );
}

/* TO DO:
- Create a fetchUserAndFriends helper function to efficiently
query the database one time and render each StepVisualizer
using the relevant data, depending on how many friends
the user has
*/
