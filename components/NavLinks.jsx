"use client";

import { useState } from "react";
import "./NavLinks.css";
import Link from "next/link";
import Modal from "./Modal";
import AvatarEditor from "./AvatarEditor";

const NavLinks = ({ allHats, allShirts, allPants, allBoots, allWeapons }) => {
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

  const toggleModal = () => {
    setAvatarModalOpen(!isAvatarModalOpen);
  };

  return (
    <div className="NavLinks">
      <button onClick={toggleModal} className="NavLinks-button">
        Avatar Editor
      </button>
      <Link href="/test_page">
        <div className="NavLinks-button">Strava Test Page</div>
      </Link>
      <div>
        {isAvatarModalOpen && (
          <Modal toggleModal={toggleModal}>
            <AvatarEditor
              hats={allHats}
              shirts={allShirts}
              pants={allPants}
              boots={allBoots}
              weapons={allWeapons}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
