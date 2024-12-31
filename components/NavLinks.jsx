"use client";

import { useState } from "react";
import "./NavLinks.css";
import Link from "next/link";
import Modal from "./Modal";

import AvatarEditor from "./AvatarEditor";
import Store from "./Store";
import DevPage from "./DevPage";

const NavLinks = ({ user, userItems, userEquipment, allItems }) => {
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
  const [isStoreModalOpen, setStoreModalOpen] = useState(false);
  const [isDevModalOpen, setDevModelOpen] = useState(false)

  // AVATAR EDITOR:
  const toggleAvatarModal = () => {
    setAvatarModalOpen(!isAvatarModalOpen);
  };

  // STORE:
  const toggleStoreModal = () => {
    setStoreModalOpen(!isStoreModalOpen);
  };

  // DEV:
  const toggleDevModal = () => {
    setDevModelOpen(!isDevModalOpen);
  }

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

      <Link href="">
        <button onClick={toggleDevModal} className="NavLinks-button">
          {" "}
          <p className="a">Dev Page</p>
        </button>
      </Link>

      {/* <Link href="/dev">
        <div className="NavLinks-button">Dev</div>
      </Link> */}

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
            <Store userItems={userItems} allItems={allItems} user={user} />
          </Modal>
        )}

        {/* DEV MODAL */}
        {isDevModalOpen && (
          <Modal toggleModal={toggleDevModal}>
            <DevPage />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
