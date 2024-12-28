import "./NavBar.css";
import NavLinks from "./NavLinks";
import Link from "next/link";
import Login from "./Login";
import Logout from "./Logout";

const NavBar = ({
  userItems,
  cookieSession,
  userEquipment,
  user,
  showLogin = true,
  allItems,
}) => {
  return (
    <div className="NavBar">
      <Link href="/">
        <h2 className="Logo">Everstride</h2>
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
