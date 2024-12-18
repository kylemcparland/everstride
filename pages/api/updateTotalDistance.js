import db from "@/db/connection";

export default async function handler(req, res) {
  try {
    const { userName, totalDistance } = req.body;
    console.log(
      `Updating total_distance_travelled and last_total_distance for ${userName}`
    );

    const selectQuery = `
      SELECT last_total_distance, gold
      FROM users
      WHERE name = $1;
    `;

    const result = await db.query(selectQuery, [userName]);
    const user = result.rows[0];

    if (!user) {
      console.error("User not found:", userName);
      return res.status(404).json({ message: "User not found" });
    }

    const goldEarned = totalDistance - user.last_total_distance;

    const updateQuery = `
      UPDATE users
      SET total_distance_travelled = $1,
          last_total_distance = $2,
          gold = gold + $3
      WHERE name = $4;
    `;

    await db.query(updateQuery, [
      totalDistance,
      totalDistance,
      goldEarned,
      userName,
    ]);
    console.log(
      `Updated total_distance_travelled, last_total_distance, and gold for ${userName}: Total Distance - ${totalDistance}, Gold Earned - ${goldEarned}`
    );

    res
      .status(200)
      .json({
        message: "Total distance travelled and gold updated successfully",
      });
  } catch (error) {
    console.error("Error updating total_distance_travelled and gold:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
