import db from "@/db/connection";

export default async function handler(req, res) {
  try {
    const result = await db.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
