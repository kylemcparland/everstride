import db from "@/db/connection";

export const fetchUserItems = async (userId, userItemType) => {
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

    // Filter the results to only include items with the type 'hat'
    const data = result.rows.filter(item => item.type === userItemType); // Adjust 'type' if needed

    // Return the user's items of type 'hat'
    return data;
  } catch (error) {
    console.error("Error fetching user items:", error);
    return error.message;
  }
};



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