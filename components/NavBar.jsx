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
  user
}) => {

  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState(null)

  return (
    <div className="NavBar">
      <Link href="/">
        <h1 className="Logo">Everstride</h1>
      </Link>
      {cookieSession ? (
        <>
          <NavLinks
            userItems={userItems}
            userEquipment={userEquipment}
            user={user}
          />
          <div>
            Logged in as {cookieSession}
            <Logout />
          </div>
        </>
      ) : (
        <>
          <Login setUsername={setUsername} setUserId={setUserId} />
        </>
      )}
    </div>
  );
};

export default NavBar;
