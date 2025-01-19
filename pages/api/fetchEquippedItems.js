import db from "@/db/connection";

// Helper function to fetch an equipped item
const fetchEquippedItem = async (userId, equippedField) => {
  const query = encodeURIComponent(`
    SELECT items.* 
    FROM items 
    JOIN users ON items.id = users.${equippedField} 
    WHERE users.id = '${userId}'
  `);

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error(
      `Failed to fetch equipped ${equippedField} for user (${userId}). Status code:`,
      res.status
    );
    throw new Error(`Failed to fetch equipped ${equippedField}`);
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0] : null;
};

// Fetching all equipped items at once
const fetchEquipmentForUser = async (userId) => {
  const [hat, shirt, pants, boots, weapon] = await Promise.all([
    fetchEquippedItem(userId, "equipped_hat"),
    fetchEquippedItem(userId, "equipped_shirt"),
    fetchEquippedItem(userId, "equipped_pants"),
    fetchEquippedItem(userId, "equipped_boots"),
    fetchEquippedItem(userId, "equipped_weapon"),
  ]);

  return { hat, shirt, pants, boots, weapon };
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query; // Get the userId from query parameters
      const equippedItems = await fetchEquipmentForUser(userId); // Fetch equipped items
      res.status(200).json(equippedItems); // Return the items in the response
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch equipped items" }); // Handle error
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" }); // Handle non-GET requests
  }
}
