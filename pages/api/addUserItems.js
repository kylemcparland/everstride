import db from "@/db/connection";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, itemId } = req.body;

    // Validate inputs
    if (!userId || !itemId) {
      return res.status(400).json({ error: "userId and itemId are required" });
    }

    try {
      // Construct the SQL query
      const query = `
        INSERT INTO user_items (user_id, item_id)
        VALUES ($1, $2)
        RETURNING *;
      `;

      // Execute the query with parameterized values to prevent SQL injection
      const result = await db.query(query, [userId, itemId]);

      // Return the inserted row
      return res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error("Error adding user item:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
