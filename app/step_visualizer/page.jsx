import "./page.css";
import StepVisualizer from "@/components/step_visualizer";
import { fetchUserAndFriends } from "../helpers/userHelpers";
import { fetchEquippedShirt, fetchEquippedHat } from "../helpers/equippedItemHelpers";

export default async function StepVisualizerTestPage() {
  // Fetch user & friends data dynamically on the server-side before rendering the page...
  // Update this name to set a different user as the current user for testing:
  const username = "Ben Hallam";
  const userAndFriends = await fetchUserAndFriends(username);

  // Separate current user from friends...
  const user = userAndFriends[0];
  const friends = userAndFriends.slice(1);

  const userHat = await fetchEquippedHat(user.id)
  const userShirt = await fetchEquippedShirt(user.id)
  const friendHat = await fetchEquippedHat(friends[0].id)
  const friendShirt = await fetchEquippedShirt(friends[0].id)
  
  // Render StepVisualizer components and pass it the user's data...
  return (
    <main className="step-visualizer-container">
      {/* Render current user at top */}
      <StepVisualizer userCharacter={user} key={user.id} hat={userHat} shirt={userShirt}/>

      {/* Render friends below */}
      {friends.map((friend) => (
        <StepVisualizer userCharacter={friend} key={friend.id} hat={friendHat} shirt={friendShirt}/>
      ))}
    </main>
  );
}
