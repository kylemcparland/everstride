// FUNCTION to simply fetch ALL users in table...
export const fetchAllUsers = async () => {
  const query = encodeURIComponent("SELECT * FROM users");

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
  return data.data;
};
