import db from "@/db/connection";

export const fetchUserColour = async (userId) => {
  const query = encodeURIComponent(
    `SELECT colour FROM users WHERE id = '${userId}'`
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch colour for user (${userId}). Status code:`, res.status);
    throw new Error("Failed to fetch user colour");
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0].colour : null;
};

export const fetchEquippedHat = async (userId) => {
  const query = encodeURIComponent(`
    SELECT items.*
    FROM items
    JOIN user_items ON items.id = user_items.item_id
    JOIN users ON user_items.id = users.equipped_hat
    WHERE users.id = '${userId}'
  `);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch equipped hat for user (${userId}). Status code:`, res.status);
    throw new Error("Failed to fetch equipped hat");
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0] : null;
};

export const fetchEquippedShirt = async (userId) => {
  const query = encodeURIComponent(`
    SELECT items.*
    FROM items
    JOIN user_items ON items.id = user_items.item_id
    JOIN users ON user_items.id = users.equipped_shirt
    WHERE users.id = '${userId}'
  `);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch equipped shirt for user (${userId}). Status code:`, res.status);
    throw new Error("Failed to fetch equipped shirt");
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0] : null;
};