import "./Navbar.css";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <div className="Navbar">
      <h1 className="Logo">Everstride</h1>
      <NavLinks />
    </div>
  );
};

export default Navbar;
