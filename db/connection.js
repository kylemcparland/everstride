const { Pool } = require("pg");
require("dotenv").config(); // Make sure you load environment variables

// Initialize the database connection pool using environment variables
const db = new Pool({
  connectionString: process.env.POSTGRES_URL, // You can rely on the full URL here if set
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,  // Use default port 5432 if not specified
});

// Function to update the distance traveled today for a user
db.updateDistance = async (userName, distance) => {
  try {
    console.log(`Updating distance for user: ${userName} with distance: ${distance}`);
    const updateQuery = `
      UPDATE users
      SET distance_travelled_today = $1
      WHERE name = $2;
    `;
    await db.query(updateQuery, [distance, userName]);
    console.log(`Distance for user ${userName} updated successfully.`);
  } catch (err) {
    console.error(`Error updating distance for user ${userName}:`, err);
  }
};

module.exports = db;