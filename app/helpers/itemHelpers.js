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

// Function to get all items in the database
export const fetchAllItems = async () => {
  const query = "SELECT * FROM items";
  return await fetchFromAPI(query);
};

// Function to get id for named item
export const getItemIdByName = async (itemName) => {
  try {
    // Validate input
    if (!itemName) {
      throw new Error("itemName is required");
    }

    // Construct the SQL query
    const query = `
      SELECT id
      FROM items
      WHERE name = $1;
    `;

    // Execute the query with parameterized values to prevent SQL injection
    const result = await db.query(query, [itemName]);

    // Check if an item was found
    if (result.rows.length === 0) {
      return {
        success: false,
        message: `No item found with the name "${itemName}"`,
      };
    }

    // Return the item ID
    return {
      success: true,
      data: result.rows[0].id,
    };
  } catch (error) {
    console.error("Error fetching item ID by name:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// Function to fetch items by type
export const fetchItemsByType = async (type) => {
  const query = `SELECT * FROM items WHERE type = '${type}'`;
  return await fetchFromAPI(query);
};
