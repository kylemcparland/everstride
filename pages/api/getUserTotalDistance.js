import db from "@/db/connection";

export default async function handler(req, res) {
  try {
    const { userName } = req.body;
    const selectQuery = `
      SELECT total_distance_travelled
      FROM users
      WHERE name = $1;
    `;

    const result = await db.query(selectQuery, [userName]);
    const user = result.rows[0];

    if (!user) {
      console.error("User not found:", userName);
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ totalDistanceTravelled: user.total_distance_travelled });
  } catch (error) {
    console.error("Error fetching total distance travelled:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
