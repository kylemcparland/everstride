"use client"

import "./NavBar.css";
import NavLinks from "./NavLinks";
import Link from "next/link";
import Login from "./Login";
import Logout from "./Logout";
import { useState } from "react";

const NavBar = ({
  userItems,
  cookieSession,
  userEquipment,
  user,
  showLogin = true
}) => {

  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState(null)

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
          />
          <div className="UserLogOutContainer">
            {cookieSession}
            <Logout />
          </div>
          
        </>
      ) : (
        showLogin && (
        <>
          <Login setUsername={setUsername} setUserId={setUserId} />
        </>
        )
      )}
    </div>
  );
};

export default NavBar;
