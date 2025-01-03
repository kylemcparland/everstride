import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function StripeRedirect() {
  // Get current user...
  const cookieSession = (await cookies()).get("session")?.value;

  const userResponse = await fetch(
    `http://localhost:3000/api/getUserByName?name=${cookieSession}`,
    {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
    }
  );

  const userObject = await userResponse.json();

  const userId = userObject.id;
  let userGold = userObject.gold;
  console.log("User's previous gold:", userGold);
  const newGoldAmount = (userGold += 20);

  const goldResponse = await fetch("http://localhost:3000/api/updateUserGold", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ userId, newGoldAmount }),
  });

  const goldData = await goldResponse.json();

  if (goldResponse.ok) {
    console.log("Gold successfully updated:", goldData.gold);
    redirect("/");
  } else {
    setError(goldData.error || "Failed to update gold");
    console.error(goldData.error);
  }

  return <div>Redirecting...</div>;
}
