import db from "@/db/connection";

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
}