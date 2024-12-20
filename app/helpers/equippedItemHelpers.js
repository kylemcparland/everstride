import db from "@/db/connection";

// Helper function to fetch equipped items
const fetchEquippedItem = async (userId, equippedField) => {
  const query = encodeURIComponent(`
    SELECT items.*
    FROM items
    JOIN user_items ON items.id = user_items.item_id
    JOIN users ON user_items.id = users.${equippedField}
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

// Refactored individual functions
export const fetchEquippedHat = (userId) => fetchEquippedItem(userId, 'equipped_hat');
export const fetchEquippedShirt = (userId) => fetchEquippedItem(userId, 'equipped_shirt');
export const fetchEquippedPants = (userId) => fetchEquippedItem(userId, 'equipped_pants');
export const fetchEquippedBoots = (userId) => fetchEquippedItem(userId, 'equipped_boots');
export const fetchEquippedWeapon = (userId) => fetchEquippedItem(userId, 'equipped_weapon');