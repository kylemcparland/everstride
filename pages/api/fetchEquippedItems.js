import db from "@/db/connection";

// Helper function to fetch equipped item directly from the database
const fetchEquippedItem = async (userId, equippedField) => {
  try {
    // Query to fetch equipped item from the database based on the equipped field
    const result = await db.query(
      `
        SELECT items.* 
        FROM items 
        JOIN users ON items.id = users.${equippedField} 
        WHERE users.id = $1
      `,
      [userId]
    );

    // Return the first item or null if no item is found
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error(
      `Error fetching equipped ${equippedField} for user (${userId}):`,
      error
    );
    return null;
  }
};

// Fetching all equipped items at once
const fetchEquipmentForUser = async (userId) => {
  if (!userId) {
    // If no userId is provided, return null for all equipment
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
    fetchEquippedItem(userId, "equipped_hat"),
    fetchEquippedItem(userId, "equipped_shirt"),
    fetchEquippedItem(userId, "equipped_pants"),
    fetchEquippedItem(userId, "equipped_boots"),
    fetchEquippedItem(userId, "equipped_weapon"),
  ]);

  return { hat, shirt, pants, boots, weapon };
};

// API handler to respond with equipped items for a user
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query; // Get the userId from query parameters
      const equippedItems = await fetchEquipmentForUser(userId); // Fetch equipped items from the database
      res.status(200).json(equippedItems); // Return the equipped items in the response
    } catch (error) {
      console.error("Error in fetching equipped items:", error);
      res.status(500).json({ error: "Failed to fetch equipped items" }); // Handle error
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" }); // Handle non-GET requests
  }
}
