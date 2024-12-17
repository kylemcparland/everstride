import db from "@/db/connection";

// Function to get all items in database
export const fetchAllItems = async () => {
  const query = encodeURIComponent(
    `SELECT * 
    FROM items`);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch all items. Status code:", res.status);
    throw new Error("Failed to fetch all items");
  }

  const data = await res.json();
  return data.data;
};

// Function to get id for named item
export const fetchItemIdByName = async (itemName) => {
  const query = encodeURIComponent(
    `SELECT id 
    FROM items 
    WHERE name = '${itemName}'`
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch item ID for name (${itemName}). Status code:`, res.status);
    throw new Error("Failed to fetch item ID");
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0].id : null;
};

export const fetchItemsByType = async (type) => {
  const query = encodeURIComponent(
    `SELECT * 
    FROM items 
    WHERE type = '${type}'`
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch items. Status code:", res.status);
    throw new Error("Failed to fetch items");
  }

  const data = await res.json();
  return data.data;
};