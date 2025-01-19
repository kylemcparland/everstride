import db from "@/db/connection";

// Helper function to fetch equipped items
const fetchEquippedItem = async (userId, equippedField) => {
  // Construct the SQL query
  const query = `
    SELECT items.*
    FROM items
    JOIN users ON items.id = users.${equippedField}
    WHERE users.id = '${userId}'
  `;

  // Encode the query
  const encodedQuery = encodeURIComponent(query);

  // Dynamically build the full URL using the base URL and API path
  const apiUrl = new URL('/api', process.env.NEXT_PUBLIC_BASE_URL); // Adding /api dynamically
  apiUrl.searchParams.append('query', encodedQuery);  // Safely appending the query string

  try {
    // Perform the fetch request
    const res = await fetch(apiUrl.toString(), {
      method: "GET",
    });

    if (!res.ok) {
      console.error(`Failed to fetch equipped ${equippedField} for user (${userId}). Status code:`, res.status);
      throw new Error(`Failed to fetch equipped ${equippedField}`);
    }

    // Parse the JSON response
    const data = await res.json();

    // Return the first item or null if no items found
    return data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error(`Error fetching equipped ${equippedField} for user (${userId}):`, error);
    throw error;  // Rethrow the error to be handled by the caller
  }
};

// Refactored individual functions for each equipped item
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

  // Use Promise.all to fetch all equipped items simultaneously
  const [hat, shirt, pants, boots, weapon] = await Promise.all([
    fetchEquippedHat(userId),
    fetchEquippedShirt(userId),
    fetchEquippedPants(userId),
    fetchEquippedBoots(userId),
    fetchEquippedWeapon(userId),
  ]);

  return { hat, shirt, pants, boots, weapon };
}
