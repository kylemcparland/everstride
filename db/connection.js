const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

db.updateDistance = async (userName, distance) => {
  console.log(
    `Updating distance for user: ${userName} with distance: ${distance}`
  );
  const updateQuery = `
    UPDATE users
    SET distance_travelled_today = $1
    WHERE name = $2;
  `;
  await db.query(updateQuery, [distance, userName]);
};

module.exports = db;
