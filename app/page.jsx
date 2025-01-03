import "./page.css";
import NavBar from "@/components/NavBar";
import PageBody from "@/components/PageBody";
import Footer from "@/components/Footer";
import PurchaseGoldStripe from "@/components/PurchaseGoldStripe";
import { fetchUserAndFriends } from "./helpers/userHelpers";
import { fetchAllUserItems } from "./helpers/userItemsHelpers";
import { fetchEquipmentForUser } from "./helpers/equippedItemHelpers";
import { fetchAllItems } from "./helpers/itemHelpers";
import { cookies } from "next/headers";

export default async function HomePage() {
  // Retrieve login info if any. Set it as current username...
  const cookieSession = (await cookies()).get("session")?.value;
  const username = cookieSession ? cookieSession : undefined;

  // DB QUERY: Fetch user & friends data dynamically on the server-side before rendering the homepage...
  const userAndFriends = await fetchUserAndFriends(username);

  // Separate current user from friends...
  const user = userAndFriends[0];
  const friends = userAndFriends.slice(1);

  // Goal distance set (will make this dynamic but for now will be static and passed down...):
  const goal_distance = 1000;

  // Get the user's items and equipped items to pass on as props
  const userItems = await fetchAllUserItems(user?.id);
  const userEquipment = await fetchEquipmentForUser(user?.id);
  // Fetch all items in DB for use in STORE component (This is too many queries to make for one table so we'll need to consolidate eventually)
  const allItems = await fetchAllItems();

  return (
    <main className="HomePage">
      <NavBar
        cookieSession={cookieSession}
        user={user}
        userItems={userItems}
        userEquipment={userEquipment}
        allItems={allItems}
      />

      {username ? (
        <>
          {/* TESTING PURCHASE GOLD LINK */}
          <PurchaseGoldStripe />
          <PageBody
            user={user}
            friends={friends}
            goal_distance={goal_distance}
          />
          <Footer
            distance_today={user.distance_travelled_today}
            goal_distance={goal_distance}
            username={username}
          />
        </>
      ) : (
        <Footer />
      )}
    </main>
  );
}
