import "./NavBar.css";
import NavLinks from "./NavLinks";

const NavBar = () => {
  return (
    <div className="NavBar">
      <h1 className="Logo">Everstride</h1>
      <NavLinks />
    </div>
  );
};

export default NavBar;
