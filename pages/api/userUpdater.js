import db from "@/db/connection";

export default async function userUpdater(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userName, distance } = req.body;

  try {
    const selectUserQuery = `
      SELECT name, distance_travelled_today, last_total_distance, total_distance_travelled, gold, last_travelled_today, accumulated_distance
      FROM users
      WHERE name = $1;
    `;

    const result = await db.query(selectUserQuery, [userName]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      name,
      distance_travelled_today,
      last_total_distance,
      total_distance_travelled,
      gold,
      last_travelled_today,
      accumulated_distance,
    } = user;

    const newDistanceTravelledToday =
      parseFloat(distance_travelled_today) + parseFloat(distance);

    const updateDistanceQuery = `
      UPDATE users
      SET distance_travelled_today = $1
      WHERE name = $2;
    `;

    await db.query(updateDistanceQuery, [newDistanceTravelledToday, name]);
    console.log(
      `🔵 Distance updated to ${newDistanceTravelledToday} for user ${name}`
    );

    const newTotalDistance = total_distance_travelled + parseFloat(distance);

    const newAccumulatedDistance =
      parseFloat(distance_travelled_today) + parseFloat(distance);

    if (newAccumulatedDistance < accumulated_distance) {
      console.log(`🔴 userUpdater ${name}: Skipped (prevent decrease)`);
      return res.status(200).json({ message: "Skipped (prevent decrease)" });
    }

    const goldEarned = parseFloat(distance); // Gold earned should match the added distance

    const updateTotalDistanceQuery = `
      UPDATE users
      SET total_distance_travelled = $1,
          last_total_distance = $2,
          gold = gold + $3,
          last_travelled_today = $4,
          accumulated_distance = $5
      WHERE name = $6;
    `;

    await db.query(updateTotalDistanceQuery, [
      newTotalDistance,
      newAccumulatedDistance,
      goldEarned,
      newDistanceTravelledToday,
      newAccumulatedDistance,
      name,
    ]);

    console.log(`\n🔵 userUpdater ${name}:
      Last Total Distance: ${last_total_distance}
      New Total Distance: ${newTotalDistance}
      Gold increased amount: ${goldEarned}
      Distance Travelled Today: ${newDistanceTravelledToday}
      Last Travelled Today updated to: ${newDistanceTravelledToday}
      Accumulated Distance: ${newAccumulatedDistance}`);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("⛔ Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
