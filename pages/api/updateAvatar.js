import db from "@/db/connection";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, hatId, shirtId, pantsId, bootsId, weaponId, avatarColor } = req.body;

    // Log the received data to check userId
    console.log('Received data:', { userId, hatId, shirtId, pantsId, bootsId, weaponId, avatarColor });

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    try {
      const updateQuery = `
        UPDATE users
        SET 
          equipped_hat = $1,
          equipped_shirt = $2,
          equipped_pants = $3,
          equipped_boots = $4,
          equipped_weapon = $5,
          colour = $6
        WHERE id = $7;
      `;

      console.log("Executing query:", updateQuery);
      console.log("With parameters:", [
        hatId || null,
        shirtId || null,
        pantsId || null,
        bootsId || null,
        weaponId || null,
        avatarColor || 'base', // Default to 'base' if no color is selected
        userId,
      ]);

      const result = await db.query(updateQuery, [
        hatId || null,
        shirtId || null,
        pantsId || null,
        bootsId || null,
        weaponId || null,
        avatarColor || 'base',
        userId,
      ]);

      if (result.rowCount > 0) {
        console.log("Database updated successfully.");
        return res.status(200).json({ message: "Equipment updated successfully!" });
      } else {
        console.error("No rows were updated. The user ID might be incorrect.");
        return res.status(400).json({ message: "No equipment updated. Please check user ID." });
      }
    } catch (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: `Error updating equipment: ${error.message}` });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}