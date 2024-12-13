// FUNCTION to fetch user by name (argument)...
export const fetchUserByName = async (name) => {
  const query = encodeURIComponent(
    `SELECT * FROM users WHERE name = '${name}'`
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch users. Status code:", res.status);
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();
  return data.data[0];
};
