import db from "@/db/connection";

export default async function handler(req, res) {
  try {
    const { userName, distance } = req.body;
    console.log(`Updating distance for ${userName} to ${distance}`);

    const updateQuery = `
      UPDATE users
      SET distance_travelled = $1
      WHERE name = $2;
    `;

    const result = await db.query(updateQuery, [distance, userName]);
    console.log(`Update result: ${result}`);

    res.status(200).json({ message: "Distance updated successfully" });
  } catch (error) {
    console.error("Error updating distance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
