import db from "@/db/connection";

export default async function updateDistance(req, res) {
  try {
    const { userName, distance } = req.body;
    // console.log('🟢 Starting updateDistance');

    const updateQuery = `
      UPDATE users
      SET distance_travelled_today = $1
      WHERE name = $2;
    `;

    const result = await db.query(updateQuery, [distance, userName]);
    console.log(`\n🟢 STRAVA updateDistance for ${userName}: 
      Travelled Today: ${distance}`);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("⛔ Error updating distance today:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
