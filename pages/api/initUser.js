// pages/api/initUser.js

import db from "@/db/connection";

export default async function initUser(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const selectUsersQuery = `
      SELECT name, distance_travelled_today, last_total_distance, total_distance_travelled, gold
      FROM users;
    `;

    const result = await db.query(selectUsersQuery);
    const users = result.rows;

    for (const user of users) {
      const {
        name,
        distance_travelled_today,
        last_total_distance,
        total_distance_travelled,
        gold,
      } = user;

      const updateDistanceQuery = `
        UPDATE users
        SET distance_travelled_today = $1
        WHERE name = $2;
      `;

      await db.query(updateDistanceQuery, [distance_travelled_today, name]);
      console.log(`\n🔵 initUser ${name}: 
        Distance Travelled Today: ${distance_travelled_today}`);

      const newTotalDistance =
        total_distance_travelled + distance_travelled_today;
      const goldEarned = newTotalDistance - last_total_distance;

      const updateTotalDistanceQuery = `
        UPDATE users
        SET total_distance_travelled = $1,
            last_total_distance = $2,
            gold = gold + $3
        WHERE name = $4;
      `;

      await db.query(updateTotalDistanceQuery, [
        newTotalDistance,
        newTotalDistance,
        goldEarned,
        name,
      ]);

      console.log(`\n🔵 initUser ${name}:
        Last Total Distance: ${last_total_distance}
        New Total Distance: ${newTotalDistance}
        Gold increased amount: ${goldEarned}`);
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("⛔ Error initializing users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
