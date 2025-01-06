import db from "@/db/connection";

export default async function removeFriend(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId1, userId2 } = req.body;

  try {
    console.log(
      "removeFriend removing user with ID " +
        userId2 +
        " from user ID " +
        userId1
    );

    // Update the user_friends table to DELETE the row containing the friend relationship

    await db.query(
      "DELETE FROM user_friends WHERE user_id_1 = $1 AND user_id_2 = $2",
      [userId1, userId2]
    );

    res.status(200).json({ message: "removeFriend success" });
  } catch (error) {
    console.error("removeFriend error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
