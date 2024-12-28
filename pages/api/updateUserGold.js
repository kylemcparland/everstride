import db from "@/db/connection";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, newGoldAmount } = req.body;

      // Update the user's gold
      const updateQuery = `
        UPDATE users
        SET gold = $1
        WHERE id = $2
        RETURNING gold;
      `;
      const result = await db.query(updateQuery, [newGoldAmount, userId]);

      // Check if the update was successful
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const updatedUser = result.rows[0];
      console.log(`Updated gold for user ID ${userId}: ${updatedUser.gold}`);
      res.status(200).json({ gold: updatedUser.gold });
    } catch (error) {
      console.error("Error updating gold:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Only POST allowed." });
  }
}
