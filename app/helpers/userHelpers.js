import db from "@/db/connection";

export async function fetchAllUsers() {
  try {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
}

export async function fetchUserByName(name) {
  try {
    const result = await db.query("SELECT * FROM users WHERE name = $1", [
      name,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching user by name (${name}):`, error);
    return null;
  }
}

export async function fetchUserAndFriends(name) {
  try {
    const query = `
      SELECT u.*, 'current_user' AS user_tag
      FROM users u
      WHERE u.id = (SELECT id FROM users WHERE name = $1)
      UNION
      SELECT u.*, 'friend' AS user_tag
      FROM users u
      WHERE u.id IN (
        SELECT user_id_2
        FROM user_friends
        WHERE user_id_1 = (SELECT id FROM users WHERE name = $1)
        UNION
        SELECT user_id_1
        FROM user_friends
        WHERE user_id_2 = (SELECT id FROM users WHERE name = $1)
      )
      ORDER BY user_tag ASC;
    `;

    const result = await db.query(query, [name]);
    return result.rows;
  } catch (error) {
    console.error(`Error fetching user and friends for ${name}:`, error);
    throw new Error(`Error fetching user and friends for ${name}`);
  }
}
