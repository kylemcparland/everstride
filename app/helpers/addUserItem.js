import db from "@/db/connection";

// FUNCTION to fetch user by name (argument)...
export const addUserItem = async (userId, itemId) => {
  try {
    // Validate inputs
    if (!userId || !itemId) {
      throw new Error("userId and itemId are required");
    }

    // Construct the SQL query
    const query = `
      INSERT INTO user_items (user_id, item_id)
      VALUES ($1, $2)
      RETURNING *;
    `;

    // Execute the query with parameterized values to prevent SQL injection
    const result = await db.query(query, [userId, itemId]);

    // Return the inserted row
    return {
      success: true,
      data: result.rows[0],
    };
  } catch (error) {
    console.error("Error adding user item:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}