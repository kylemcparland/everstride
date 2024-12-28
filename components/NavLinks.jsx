"use client";

import { useState } from "react";
import "./NavLinks.css";
import Link from "next/link";
import Modal from "./Modal";

import AvatarEditor from "./AvatarEditor";
import Store from "./Store";

const NavLinks = ({ user, userItems, userEquipment, allItems }) => {
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
  const [isStoreModalOpen, setStoreModalOpen] = useState(false);

  // AVATAR EDITOR:
  const toggleAvatarModal = () => {
    setAvatarModalOpen(!isAvatarModalOpen);
  };

  // STORE:
  const toggleStoreModal = () => {
    setStoreModalOpen(!isStoreModalOpen);
  };

  return (
    <div className="NavLinks">
      <Link href="">
        <button onClick={toggleAvatarModal} className="NavLinks-button">
          {" "}
          <p className="a">Avatar Editor</p>
        </button>
      </Link>
      {/* The only way to make the styling match in the nav bar was to wrap this buttin in a link to nothing */}

      <Link href="">
        <button onClick={toggleStoreModal} className="NavLinks-button">
          {" "}
          <p className="a">Gold Market</p>
        </button>
      </Link>

      <Link href="/">
        <div className="NavLinks-button">My Friends</div>
      </Link>

      <Link href="/">
        <div className="NavLinks-button">World Progress</div>
      </Link>

      <Link href="/">
        <div className="NavLinks-button">Dev</div>
      </Link>

      <div>
        {/* AVATAR EDITOR MODAL */}
        {isAvatarModalOpen && (
          <Modal toggleModal={toggleAvatarModal}>
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

        {/* STORE MODAL */}
        {isStoreModalOpen && (
          <Modal toggleModal={toggleStoreModal}>
            <Store
              allItems={allItems}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
