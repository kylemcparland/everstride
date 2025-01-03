import db from "@/db/connection";

export default async function addFriend(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId1, userId2 } = req.body;

  try {
    console.log("addFriend adding user with ID "+ userId1 + " to user ID " + userId2);
    await db.query(
      "INSERT INTO user_friends (user_id_1, user_id_2) VALUES ($1, $2)",
      [userId1, userId2]
    );
    res.status(200).json({ message: "addFriend success" });
  } catch (error) {
    console.error("addFriend error");
    res.status(500).json({ error: "Internal Server Error" });
  }
}
