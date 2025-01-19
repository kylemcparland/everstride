import db from "@/db/connection";

// Helper function to fetch equipped items directly from the database
const fetchEquippedItem = async (userId, equippedField) => {
  try {
    // Query to fetch equipped item based on the user's field (e.g., equipped_hat, equipped_shirt, etc.)
    const result = await db.query(
      `
        SELECT items.* 
        FROM items
        JOIN users ON items.id = users.${equippedField}
        WHERE users.id = $1
      `,
      [userId]
    );

    // Return the first item or null if no items are found
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error(
      `Error fetching equipped ${equippedField} for user (${userId}):`,
      error
    );
    return null;
  }
};

// Refactored individual functions for each equipped item
export const fetchEquippedHat = (userId) =>
  fetchEquippedItem(userId, "equipped_hat");
export const fetchEquippedShirt = (userId) =>
  fetchEquippedItem(userId, "equipped_shirt");
export const fetchEquippedPants = (userId) =>
  fetchEquippedItem(userId, "equipped_pants");
export const fetchEquippedBoots = (userId) =>
  fetchEquippedItem(userId, "equipped_boots");
export const fetchEquippedWeapon = (userId) =>
  fetchEquippedItem(userId, "equipped_weapon");

// Helper function to fetch all equipment for a user
export const fetchEquipmentForUser = async (userId) => {
  if (!userId) {
    // Return an empty object if userId is undefined
    return {
      hat: null,
      shirt: null,
      pants: null,
      boots: null,
      weapon: null,
    };
  }

  // Use Promise.all to fetch all equipped items simultaneously
  const [hat, shirt, pants, boots, weapon] = await Promise.all([
    fetchEquippedHat(userId),
    fetchEquippedShirt(userId),
    fetchEquippedPants(userId),
    fetchEquippedBoots(userId),
    fetchEquippedWeapon(userId),
  ]);

  return { hat, shirt, pants, boots, weapon };
};
