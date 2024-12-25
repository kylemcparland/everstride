import db from "@/db/connection";

export default async function handler(req, res) {
  try {
    const { userName, distanceToAdd } = req.body;
    console.log(
      `Updating total_distance_travelled, last_total_distance, and distance_travelled_today for ${userName}`
    );

    const selectQuery = `
      SELECT last_total_distance, total_distance_travelled, distance_travelled_today, gold
      FROM users
      WHERE name = $1;
    `;

    const result = await db.query(selectQuery, [userName]);
    const user = result.rows[0];

    if (!user) {
      console.error("User not found:", userName);
      return res.status(404).json({ message: "User not found" });
    }

    const lastTotalDistance = user.last_total_distance || 0;
    const totalDistanceTravelled = user.total_distance_travelled || 0;
    const distanceTravelledToday = user.distance_travelled_today || 0;

    const newTotalDistance = totalDistanceTravelled + parseInt(distanceToAdd);
    const newDistanceTravelledToday =
      distanceTravelledToday + parseInt(distanceToAdd);
    const goldEarned = newTotalDistance - lastTotalDistance;

    const updateQuery = `
      UPDATE users
      SET total_distance_travelled = $1,
          last_total_distance = $2,
          distance_travelled_today = $3,
          gold = gold + $4
      WHERE name = $5;
    `;

    await db.query(updateQuery, [
      newTotalDistance,
      newTotalDistance,
      newDistanceTravelledToday,
      goldEarned,
      userName,
    ]);
    console.log(
      `Updated total_distance_travelled, last_total_distance, distance_travelled_today, and gold for ${userName}: Total Distance - ${newTotalDistance}, Distance Today - ${newDistanceTravelledToday}, Gold Earned - ${goldEarned}`
    );

    res.status(200).json({
      message:
        "Total distance travelled, distance today, and gold updated successfully",
    });
  } catch (error) {
    console.error(
      "Error updating total_distance_travelled, distance today, and gold:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
}
