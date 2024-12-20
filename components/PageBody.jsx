import "./PageBody.css";
import StepVisualizer from "@/components/StepVisualizer";
import {
  fetchEquippedHat,
  fetchEquippedShirt,
  fetchEquippedPants,
  fetchEquippedBoots,
  fetchEquippedWeapon,
} from "@/app/helpers/equippedItemHelpers";
import { fetchUserItems } from "@/app/helpers/userItemsHelpers";

// Helper function to fetch all equipment for a user
async function fetchEquipmentForUser(userId) {
  const [hat, shirt, pants, boots, weapon] = await Promise.all([
    fetchEquippedHat(userId),
    fetchEquippedShirt(userId),
    fetchEquippedPants(userId),
    fetchEquippedBoots(userId),
    fetchEquippedWeapon(userId),
  ]);

  return { hat, shirt, pants, boots, weapon };
}

export default async function PageBody({ user, friends, goal_distance }) {
  // Fetch the user's equipment
  const userEquipment = await fetchEquipmentForUser(user.id);

  // Fetch equipment for each friend
  const friendsEquipment = await Promise.all(
    friends.map(async (friend) => ({
      ...friend,
      equipment: await fetchEquipmentForUser(friend.id),
    }))
  );
  
  // Render StepVisualizer components and pass the user's data...
  return (
    <main className="PageBody">
      {/* Render current user at top */}
      <StepVisualizer
        userCharacter={user}
        key={user.id}
        {...userEquipment}
        goal_distance={goal_distance}
      />

      {/* Render friends below */}
      {friendsEquipment.map((friendData) => (
        <StepVisualizer
          userCharacter={friendData}
          key={friendData.id}
          {...friendData.equipment}
          goal_distance={goal_distance}
        />
      ))}
    </main>
  );
}
