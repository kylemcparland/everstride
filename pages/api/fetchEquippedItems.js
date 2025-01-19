import db from "@/db/connection";

// Generic helper function to fetch data from the API
const fetchFromAPI = async (query) => {
  const encodedQuery = encodeURIComponent(query);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${encodedQuery}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch data. Status code:", res.status);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.data;
};

// Helper function to fetch an equipped item for a user (based on a field)
const fetchEquippedItem = async (userId, equippedField) => {
  const query = `
    SELECT items.* 
    FROM items 
    JOIN users ON items.id = users.${equippedField} 
    WHERE users.id = '${userId}'
  `;
  const equippedItems = await fetchFromAPI(query);
  return equippedItems.length > 0 ? equippedItems[0] : null;
};

// Function to fetch all equipped items for a user
export const fetchEquipmentForUser = async (userId) => {
  const [hat, shirt, pants, boots, weapon] = await Promise.all([
    fetchEquippedItem(userId, 'equipped_hat'),
    fetchEquippedItem(userId, 'equipped_shirt'),
    fetchEquippedItem(userId, 'equipped_pants'),
    fetchEquippedItem(userId, 'equipped_boots'),
    fetchEquippedItem(userId, 'equipped_weapon'),
  ]);

  return { hat, shirt, pants, boots, weapon };
};

// API route handler
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query;  // Get the userId from query parameters
      if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
      }

      const equippedItems = await fetchEquipmentForUser(userId);  // Fetch equipped items
      res.status(200).json(equippedItems);  // Return the items in the response
    } catch (error) {
      console.error("Error fetching equipped items:", error);
      res.status(500).json({ error: "Failed to fetch equipped items" });  // Handle error
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });  // Handle non-GET requests
  }
}
