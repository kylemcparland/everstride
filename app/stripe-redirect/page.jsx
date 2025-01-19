import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getCookieData() {
  const cookieData = cookies().get("session")?.value;
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  );
}

export default async function StripeRedirect() {
  // Get current user...
  const cookieSession = await getCookieData();

  const userResponse = await fetch(
    `https://everstride.vercel.app/api/getUserByName?name=${cookieSession}`,
    {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
    }
  );

  const userObject = await userResponse.json();

  const userId = userObject.id;
  let userGold = userObject.gold;

  const newGoldAmount = (userGold += 300);

  const goldResponse = await fetch("https://everstride.vercel.app/api/updateUserGold", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ userId, newGoldAmount }),
  });

  const goldData = await goldResponse.json();

  if (goldResponse.ok) {
    redirect("/");
  } else {
    setError(goldData.error || "Failed to update gold");
    console.error(goldData.error);
  }

  return <div>Redirecting...</div>;
}
