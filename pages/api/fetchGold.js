import db from "@/db/connection";

export default async function fetchGold(req, res) {
  try {
    const { userName } = req.body;

    const selectQuery = `
      SELECT gold
      FROM users
      WHERE name = $1;
    `;

    const result = await db.query(selectQuery, [userName]);
    const user = result.rows[0];

    console.log(`Fetched gold for ${userName}: ${user.gold}`);
    res.status(200).json({ gold: user.gold });
  } catch (error) {
    console.error("Error fetching gold:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
