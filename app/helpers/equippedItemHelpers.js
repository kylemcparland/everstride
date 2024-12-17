import db from "@/db/connection";

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

export const fetchEquippedPants = async (userId) => {
  const query = encodeURIComponent(`
    SELECT items.*
    FROM items
    JOIN user_items ON items.id = user_items.item_id
    JOIN users ON user_items.id = users.equipped_pants
    WHERE users.id = '${userId}'
  `);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch equipped pants for user (${userId}). Status code:`, res.status);
    throw new Error("Failed to fetch equipped pants");
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0] : null;
};

export const fetchEquippedBoots = async (userId) => {
  const query = encodeURIComponent(`
    SELECT items.*
    FROM items
    JOIN user_items ON items.id = user_items.item_id
    JOIN users ON user_items.id = users.equipped_boots
    WHERE users.id = '${userId}'
  `);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch equipped boots for user (${userId}). Status code:`, res.status);
    throw new Error("Failed to fetch equipped boots");
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0] : null;
};

export const fetchEquippedWeapon = async (userId) => {
  const query = encodeURIComponent(`
    SELECT items.*
    FROM items
    JOIN user_items ON items.id = user_items.item_id
    JOIN users ON user_items.id = users.equipped_weapon
    WHERE users.id = '${userId}'
  `);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch equipped weapon for user (${userId}). Status code:`, res.status);
    throw new Error("Failed to fetch equipped weapon");
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0] : null;
};