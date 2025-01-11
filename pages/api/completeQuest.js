import db from "@/db/connection";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed. Use POST." });
  }

  const { userQuestId, userId, updatedUserGold, questId } = req.body;

  // Increment the user's quest up by one...
  let newQuestId = questId + 1;
  console.log(newQuestId)

  if (newQuestId > 7) {
    newQuestId = 1;
  }

  if (!userQuestId || !userId) {
    return res.status(400).json({
      success: false,
      message: "Missing required parameters: userQuestId or userId.",
    });
  }

  try {
    // Mark the current quest as completed...
    await db.query(
      `UPDATE user_quests
       SET completed = TRUE
       WHERE id = $1`,
      [userQuestId]
    );

    // Add a new quest for the user with newQuestId...
    await db.query(
      `INSERT INTO user_quests (user_id, quest_id, created_at, completed)
       VALUES ($1, $2, NOW(), FALSE)`,
      [userId, newQuestId]
    );

    // Reset distance_travelled_today & add gold...
    await db.query(
      `UPDATE users
       SET distance_travelled_today = 0, 
           gold = $2
       WHERE id = $1`,
      [userId, updatedUserGold]
    );

    return res.status(200).json({
      success: true,
      message: "Quest completed and new quest started.",
    });
  } catch (error) {
    console.error(
      `Error completing quest for user (user_quest_id: ${userQuestId}):`,
      error
    );
    return res.status(500).json({
      success: false,
      message: "An error occurred while completing the quest.",
    });
  }
}
