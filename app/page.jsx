import "./page.css";
import NavBar from "@/components/NavBar";
import PageBody from "@/components/PageBody";
import Footer from "@/components/Footer";
import { fetchUserAndFriends } from "./helpers/userHelpers";
import { fetchItemsByType } from "app/helpers/itemHelpers.js";
import { cookies } from "next/headers";

export default async function HomePage() {
  // Retrieve login info if any. Set is as current username...
  const cookieSession = (await cookies()).get("session")?.value;
  const username = cookieSession ? cookieSession : undefined;

  // DB QUERY: Fetch user & friends data dynamically on the server-side before rendering the homepage...
  const userAndFriends = await fetchUserAndFriends(username);

  // Separate current user from friends...
  const user = userAndFriends[0];
  const friends = userAndFriends.slice(1);

  // Goal distance set (will make this dynamic but for now will be static and passed down...):
  const goal_distance = 1000;

  // Fetch the avatar items (hats, shirts, etc.)
  const allHats = await fetchItemsByType("hat");
  const allShirts = await fetchItemsByType("shirt");
  const allPants = await fetchItemsByType("pants");
  const allBoots = await fetchItemsByType("boots");
  const allWeapons = await fetchItemsByType("weapon");

  return (
    <main className="HomePage">
      <NavBar
        allHats={allHats}
        allShirts={allShirts}
        allPants={allPants}
        allBoots={allBoots}
        allWeapons={allWeapons}
        cookieSession={cookieSession}
      />

      {username ? (
        <>
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
