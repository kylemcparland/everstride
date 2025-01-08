import db from "@/db/connection";

export async function fetchUserCurrentQuest(name) {
  try {
    const result = await db.query(
      `SELECT quests.id AS quest_id, quests.name AS quest_name, quests.description, quests.goal_steps
       FROM users
       JOIN quests ON users.current_quest_id = quests.id
       WHERE users.name = $1`,
      [name]
    );

    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching current quest for user (${name}):`, error);
    return null;
  }
}
