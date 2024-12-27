"use client";

import { useState } from "react";
import "./NavLinks.css";
import Link from "next/link";
import Modal from "./Modal";
import AvatarEditor from "./AvatarEditor";

const NavLinks = ({ user, userItems, userEquipment }) => {
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

  const toggleModal = () => {
    setAvatarModalOpen(!isAvatarModalOpen);
  };
  return (
    <div className="NavLinks">

      
      
      <Link href=""><button onClick={toggleModal} className="NavLinks-button"> <p className="a">Avatar Editor</p> </button>
      </Link>{/* The only way to make the styling match in the nav bar was to wrap this buttin in a link to nothing */}

      <Link href="/">
        <div className="NavLinks-button">Gold Market</div>
      </Link>

      <Link href="/">
        <div className="NavLinks-button">My Friends</div>
      </Link>

      <Link href="/">
        <div className="NavLinks-button">World Progress</div>
      </Link>

      <Link href="/">
        <div className="NavLinks-button">Dev Placeholder</div>
      </Link>

      <div>
        {isAvatarModalOpen && (
          <Modal toggleModal={toggleModal}>
            <AvatarEditor
              hats={userItems.hat}
              shirts={userItems.shirt}
              pants={userItems.pants}
              boots={userItems.boots}
              weapons={userItems.weapon}
              user={user}
              userEquipment={userEquipment}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
