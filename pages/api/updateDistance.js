import db from "@/db/connection";

export default async function handler(req, res) {
  try {
    const { userName, distance } = req.body;
    console.log(
      `Running updateDistance. Updating distance for ${userName} to ${distance}`
    );

    // Fetch the user's current data
    const selectQuery = `
      SELECT distance_travelled_today, total_distance_travelled, last_total_distance, gold
      FROM users
      WHERE name = $1;
    `;

    const result = await db.query(selectQuery, [userName]);
    const user = result.rows[0];

    if (!user) {
      console.error("User not found:", userName);
      return res.status(404).json({ message: "User not found" });
    }

    // console.log("Fetched user data:", user);

    // Calculate the new total distance
    const newTotalDistance = user.total_distance_travelled + distance;
    console.log("New total distance calculated:", newTotalDistance);

    // Calculate the gold earned based on the distance difference
    const distanceCovered = newTotalDistance - user.last_total_distance;
    console.log("Distance covered calculated:", distanceCovered);

    const goldEarned = Math.max(0, distanceCovered); // Ensure gold earned is non-negative
    console.log("Gold earned calculated:", goldEarned);

    // Update the user's data
    const updateQuery = `
      UPDATE users
      SET distance_travelled_today = $1,
          total_distance_travelled = $2,
          last_total_distance = $3,
          gold = gold + $4
      WHERE name = $5;
    `;

    await db.query(updateQuery, [
      distance,
      newTotalDistance,
      newTotalDistance,
      goldEarned,
      userName,
    ]);

    console.log(
      `updateDistance Ran`
    );

    res.status(200).json({ message: "Distance and gold updated successfully" });
  } catch (error) {
    console.error("Error updating distance and gold:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
