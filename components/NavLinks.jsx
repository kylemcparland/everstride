import "./NavLinks.css";
import Link from "next/link";

const NavLinks = () => {
  return (
    <div className="NavLinks">
      <Link href="/avatar_editor">
        <div className="NavLinks-button">Avatar Editor</div>
      </Link>
      <Link href="/test_page">
        <div className="NavLinks-button">Strava Test Page</div>
      </Link>
    </div>
  );
};

export default NavLinks;
