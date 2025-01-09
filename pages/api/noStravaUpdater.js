// This is a copied but separated version of updateTotalDistance, it adds new user TOTAL distance and calculates gold. It doesn't effect distance_travelled_today.

import db from "@/db/connection";

export default async function noStravaUpdater(req, res) {
  try {
    const { userName, distance } = req.body;
    console.log("🪙 noStravaUpdater addDistanceAndGold");

    const selectQuery = `
      SELECT total_distance_travelled, last_total_distance, gold
      FROM users
      WHERE name = $1;
    `;

    const result = await db.query(selectQuery, [userName]);
    const user = result.rows[0];

    if (!user) {
      console.error("User not found:", userName);
      return res.status(404).json({ message: "User not found" });
    }

    const newTotalDistance = user.total_distance_travelled + Number(distance);
    const lastTotalDistance = user.last_total_distance || 0;
    const goldEarned = newTotalDistance - lastTotalDistance;

    const updateQuery = `
      UPDATE users
      SET total_distance_travelled = $1,
          last_total_distance = $2,
          gold = gold + $3
      WHERE name = $4;
    `;

    await db.query(updateQuery, [
      newTotalDistance,
      newTotalDistance,
      goldEarned,
      userName,
    ]);

    console.log(`🪙 noStravaUpdater update database ${userName}:
      Last Total Distance: ${lastTotalDistance}
      New Total Distance: ${newTotalDistance}
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
