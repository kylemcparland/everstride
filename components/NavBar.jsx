import "./NavBar.css";
import NavLinks from "./NavLinks";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="NavBar">
      <Link href="/">
        <h1 className="Logo">Everstride</h1>
      </Link>
      <NavLinks />
    </div>
  );
};

export default NavBar;
