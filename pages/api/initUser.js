import db from "@/db/connection";

export default async function initUser(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const selectUsersQuery = `
      SELECT name, distance_travelled_today, last_total_distance, total_distance_travelled, gold, last_travelled_today
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
        last_travelled_today,
      } = user;

      if (distance_travelled_today === last_travelled_today) {
        console.log(`🟡 initUser ${name}: Already init`);
        continue;
      }

      const updateDistanceQuery = `
        UPDATE users
        SET distance_travelled_today = $1
        WHERE name = $2;
      `;

      await db.query(updateDistanceQuery, [distance_travelled_today, name]);

      const newTotalDistance =
        total_distance_travelled +
        (distance_travelled_today - last_travelled_today);

      // Check to ensure new total distance never decreases
      if (newTotalDistance < total_distance_travelled) {
        console.log(
          `🔴 initUser ${name}: distance_travelled_today - last_travelled_today is less than total_distance_travelled. Skip update.`
        );
        continue;
      }

      const goldEarned = newTotalDistance - last_total_distance;

      const updateTotalDistanceQuery = `
        UPDATE users
        SET total_distance_travelled = $1,
            last_total_distance = $2,
            gold = gold + $3,
            last_travelled_today = $4
        WHERE name = $5;
      `;

      await db.query(updateTotalDistanceQuery, [
        newTotalDistance,
        newTotalDistance,
        goldEarned,
        distance_travelled_today,
        name,
      ]);

      console.log(`\n🔵 initUser ${name}:
        Last Total Distance: ${last_total_distance}
        New Total Distance: ${newTotalDistance}
        Gold increased amount: ${goldEarned}
        Distance Travelled Today: ${distance_travelled_today}
        Last Travelled Today updated to: ${distance_travelled_today}`);
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("⛔ Error initializing users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
