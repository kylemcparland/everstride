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
