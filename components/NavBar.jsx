import "./NavBar.css";
import NavLinks from "./NavLinks";
import Link from "next/link";
import Login from "./Login";
import Logout from "./Logout";

// Simply changed showLogin to false to keep all logic in place if changing back
const NavBar = ({
  userItems,
  cookieSession,
  userEquipment,
  user,
  showLogin = false,
  allItems,
}) => {
  return (
    <div className="NavBar">
      <Link href="/">
        <p className="Logo">Everstride</p>
      </Link>
      {cookieSession ? (
        <>
          <NavLinks
            userItems={userItems}
            userEquipment={userEquipment}
            user={user}
            allItems={allItems}
          />
          <div className="UserLogOutContainer">
            {cookieSession}
            <Logout />
          </div>
        </>
      ) : (
        showLogin && (
          <>
            <Login />
          </>
        )
      )}
    </div>
  );
};

export default NavBar;
