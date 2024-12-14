import db from "@/db/connection";

export const fetchUserItems = async (userId) => {
  try {
    // Validate input
    if (!userId) {
      throw new Error("userId is required");
    }

    // Construct the SQL query
    const query = `
      SELECT items.*
      FROM user_items
      INNER JOIN items ON user_items.item_id = items.id
      INNER JOIN users ON user_items.user_id = users.id
      WHERE users.id = $1;
    `;

    // Execute the query with parameterized values to prevent SQL injection
    const result = await db.query(query, [userId]);

    // Return the user's items
    return {
      success: true,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching user items:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}