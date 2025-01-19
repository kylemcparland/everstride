import db from "@/db/connection";

// Helper function to fetch equipped items
const fetchEquippedItem = async (userId, equippedField) => {
  const query = encodeURIComponent(`
    SELECT items.*
    FROM items
    JOIN users ON items.id = users.${equippedField}
    WHERE users.id = '${userId}'
  `);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch equipped ${equippedField} for user (${userId}). Status code:`, res.status);
    throw new Error(`Failed to fetch equipped ${equippedField}`);
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0] : null;
};

// Refactored individual functions to fetch equipped items
export const fetchEquippedHat = (userId) => fetchEquippedItem(userId, 'equipped_hat');
export const fetchEquippedShirt = (userId) => fetchEquippedItem(userId, 'equipped_shirt');
export const fetchEquippedPants = (userId) => fetchEquippedItem(userId, 'equipped_pants');
export const fetchEquippedBoots = (userId) => fetchEquippedItem(userId, 'equipped_boots');
export const fetchEquippedWeapon = (userId) => fetchEquippedItem(userId, 'equipped_weapon');

// Helper function to fetch all equipment for a user
export const fetchEquipmentForUser = async (userId) => {
  if (!userId) {
    // Return an empty object if userId is undefined
    return {
      hat: null,
      shirt: null,
      pants: null,
      boots: null,
      weapon: null
    };
  }

  // Use Promise.all to fetch all equipment concurrently
  const [hat, shirt, pants, boots, weapon] = await Promise.all([
    fetchEquippedHat(userId),
    fetchEquippedShirt(userId),
    fetchEquippedPants(userId),
    fetchEquippedBoots(userId),
    fetchEquippedWeapon(userId),
  ]);

  return { hat, shirt, pants, boots, weapon };
};
