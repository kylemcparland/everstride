import "./page.css";
import NavBar from "@/components/NavBar";
import PageBody from "@/components/PageBody";
import Footer from "@/components/Footer";
import { fetchUserAndFriends } from "./helpers/userHelpers";

export default async function HomePage() {
  // Fetch user & friends data dynamically on the server-side before rendering the homepage...
  const username = "Kyle McParland";
  const userAndFriends = await fetchUserAndFriends(username);

  // Separate current user from friends...
  const user = userAndFriends[0];
  const friends = userAndFriends.slice(1);

  return (
    <main className="HomePage">
      <NavBar />
      <PageBody user={user} friends={friends}/>
      <Footer distance_today={user.distance_travelled_today}/>
    </main>
  );
}
