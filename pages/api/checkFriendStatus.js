import db from "@/db/connection";

export default async function checkFriendStatus(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId1, userId2 } = req.body;

  try {
    const result = await db.query(
      "SELECT 1 FROM user_friends WHERE user_id_1 = $1 AND user_id_2 = $2",
      [userId1, userId2]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ isFriend: true });
    } else {
      res.status(200).json({ isFriend: false });
    }
  } catch (error) {
    console.error("checkFriendStatus error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
