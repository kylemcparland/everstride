import db from "@/db/connection";

// Function to get all items in the database
export const fetchAllItems = async () => {
  try {
    const query = "SELECT * FROM items";
    const result = await db.query(query);

    // Return all items
    return result.rows;
  } catch (error) {
    console.error("Error fetching all items:", error);
    throw new Error("Failed to fetch all items");
  }
};

// Function to get ID for a named item
export const getItemIdByName = async (itemName) => {
  try {
    // Validate input
    if (!itemName) {
      throw new Error("itemName is required");
    }

    // Construct the SQL query with parameterized value
    const query = `
      SELECT id
      FROM items
      WHERE name = $1;
    `;

    // Execute the query with parameterized value to prevent SQL injection
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
  try {
    // Validate input
    if (!type) {
      throw new Error("type is required");
    }

    // Construct the SQL query with parameterized value
    const query = `
      SELECT * 
      FROM items 
      WHERE type = $1;
    `;

    // Execute the query with parameterized value to prevent SQL injection
    const result = await db.query(query, [type]);

    // Return the filtered items
    return result.rows;
  } catch (error) {
    console.error("Error fetching items by type:", error);
    throw new Error("Failed to fetch items by type");
  }
};
