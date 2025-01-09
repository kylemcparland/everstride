import db from "@/db/connection";

export default async function updateTotalDistance(req, res) {
  try {
    const { userName, totalDistance } = req.body;
    // console.log("🪙 Run updateTotalDistance");

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

    // Set last_total_distance to 0 if it's not set yet. Prevents the gold duplication issue.

    const lastTotalDistance = user.last_total_distance || 0;
    const goldEarned = totalDistance - lastTotalDistance;

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

    console.log(`\n🔵 STRAVA updateTotalDistance for ${userName}:
      Last Total Distance: ${lastTotalDistance}
      New Total Distance: ${totalDistance}
      Gold increased amount: ${goldEarned}
      `);

    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.error(
      "⛔ Error updating total_distance_travelled and gold:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
}
