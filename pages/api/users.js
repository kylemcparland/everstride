import { fetchUserAndFriends } from "@/app/helpers/userHelpers";
import { fetchEquippedHat, fetchEquippedShirt, fetchEquippedPants, fetchEquippedBoots, fetchEquippedWeapon } from "@/app/helpers/equippedItemHelpers";

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

// export default async function handler(req, res) {
//   try {
//     const username = "Jon Hiebert";
//     const userAndFriends = await fetchUserAndFriends(username);
    
//     // Fetch the user's equipment
//     const user = userAndFriends[0];
//     const userEquipment = await fetchEquipmentForUser(user.id);
    
//     // Fetch equipment for each friend
//     const friendsEquipment = await Promise.all(
//       userAndFriends.slice(1).map(async (friend) => ({
//         ...friend,
//         equipment: await fetchEquipmentForUser(friend.id),
//       }))
//     );

//     // Send the fetched data back to the client
//     res.status(200).json({
//       user: { ...user, ...userEquipment },
//       friends: friendsEquipment,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching user and friends data' });
//   }
// }