import "./page.css";
import StepVisualizer from "@/components/step_visualizer";
import { fetchUserAndFriends } from "../helpers/fetchUserAndFriends";

export default async function StepVisualizerTestPage() {
  // Fetch user & friends data dynamically on the server-side before rendering the page...
  // Update this name to set a different user as the current user for testing:
  const username = "Ben Hallam";
  const userAndFriends = await fetchUserAndFriends(username);

  // Separate current user from friends...
  const user = userAndFriends[0];
  const friends = userAndFriends.slice(1);

  // Render StepVisualizer components and pass it the user's data...
  return (
    <main className="step-visualizer-container">
      {/* Render current user at top */}
      <StepVisualizer userCharacter={user} key={user.id} />

      {/* Render friends below */}
      {friends.map((friend) => (
        <StepVisualizer userCharacter={friend} key={friend.id} />
      ))}
    </main>
  );
}
