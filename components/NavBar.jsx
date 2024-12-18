import "./NavBar.css";
import NavLinks from "./NavLinks";
import Link from "next/link";

const NavBar = ({ allHats, allShirts, allPants, allBoots, allWeapons }) => {
  return (
    <div className="NavBar">
      <Link href="/">
        <h1 className="Logo">Everstride</h1>
      </Link>
      <NavLinks
        allHats={allHats}
        allShirts={allShirts}
        allPants={allPants}
        allBoots={allBoots}
        allWeapons={allWeapons}
      />
    </div>
  );
};

export default NavBar;
