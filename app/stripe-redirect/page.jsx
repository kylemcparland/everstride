import { redirect } from "next/navigation";

export default async function StripeRedirect() {
  const userId = 1;
  const newGoldAmount = 69;

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
    redirect("/"); // Reload to reflect updated data
  } else {
    setError(goldData.error || "Failed to update gold");
    console.error(goldData.error);
  }

  // redirect("/");

  return <div>test!!!</div>;
}
