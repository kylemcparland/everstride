import db from "@/db/connection";

export default async function getUserByName(req, res) {
  const { name } = req.query;
  try {
    const result = await db.query("SELECT * FROM users WHERE name = $1", [
      name,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching user by name (${name}):`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
