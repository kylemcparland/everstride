import "./NavBar.css";
import NavLinks from "./NavLinks";
import Link from "next/link";
import Login from "./Login";
import Logout from "./Logout";

const NavBar = ({
  allHats,
  allShirts,
  allPants,
  allBoots,
  allWeapons,
  cookieSession,
  user,
  userItems
}) => {
  return (
    <div className="NavBar">
      <Link href="/">
        <h1 className="Logo">Everstride</h1>
      </Link>
      {cookieSession ? (
        <>
          <NavLinks
            allHats={allHats}
            allShirts={allShirts}
            allPants={allPants}
            allBoots={allBoots}
            allWeapons={allWeapons}
            user={user}
            userItems={userItems}
          />
          <div>
            Logged in as {cookieSession}
            <Logout />
          </div>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
};

export default NavBar;
