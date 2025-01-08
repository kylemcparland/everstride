import db from "@/db/connection";

export async function fetchUserCurrentQuest(name) {
  try {
    const result = await db.query(
      `SELECT 
         quests.id AS quest_id, 
         quests.name AS quest_name, 
         quests.description, 
         quests.goal_steps,
         user_quests.id AS user_quests_id,
         users.id AS user_id,
         user_quests.created_at,
         users.gold AS user_gold
       FROM user_quests
       JOIN users ON user_quests.user_id = users.id
       JOIN quests ON user_quests.quest_id = quests.id
       WHERE users.name = $1 AND user_quests.completed = FALSE`,
      [name]
    );

    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching current quest for user (${name}):`, error);
    return null;
  }
}
