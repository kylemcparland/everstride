"use client";

import { useState } from "react";
import "./NavLinks.css";
import Link from "next/link";
import Modal from "./Modal";

import AvatarEditor from "./AvatarEditor";
import Store from "./Store";
import DevPage from "./DevPage";
import Friends from "./Friends";
import { WorldMap } from "./WorldMap";

const NavLinks = ({ user, userItems, userEquipment, allItems }) => {
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
  const [isStoreModalOpen, setStoreModalOpen] = useState(false);
  const [isDevModalOpen, setDevModelOpen] = useState(false);
  const [isFriendsModalOpen, setFriendsModelOpen] = useState(false);
  const [isMapModalOpen, setMapModalOpen] = useState(false);

  const currentUserId = user.id;
  // Get the ID from the current user! Pass it to the Friends component.

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
  };

  // FRIENDS:
  const toggleFriendsModal = () => {
    setFriendsModelOpen(!isFriendsModalOpen);
  };

  // MAP:
  const toggleMapModal = () => {
    setMapModalOpen(!isMapModalOpen);
  };

  return (
    <div className="NavLinks">
      <Link href="">
        <button onClick={toggleAvatarModal} className="NavLinks-button">
          <p className="a">Avatar Editor</p>
        </button>
      </Link>
      {/* The only way to make the styling match in the nav bar was to wrap this button in a link to nothing */}

      <Link href="">
        <button onClick={toggleStoreModal} className="NavLinks-button">
          <p className="a">Gold Market</p>
        </button>
      </Link>

      <Link href="">
        <button onClick={toggleFriendsModal} className="NavLinks-button">
          <p className="a">My Friends</p>
        </button>
      </Link>

      <Link href="">
        <button onClick={toggleMapModal} className="NavLinks-button">
          <p className="a">World Map</p>
        </button>
      </Link>

      <Link href="">
        <button onClick={toggleDevModal} className="NavLinks-button">
          <p className="a">Dev Page</p>
        </button>
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
            <Store userItems={userItems} allItems={allItems} user={user} />
          </Modal>
        )}

        {/* DEV MODAL */}
        {isDevModalOpen && (
          <Modal toggleModal={toggleDevModal}>
            <DevPage />
          </Modal>
        )}

        {/* MAP MODAL */}
        {isMapModalOpen && (
          <Modal toggleModal={toggleMapModal}>
            <WorldMap steps={user.total_distance_travelled} totalSteps={10000}/>
          </Modal>
        )}

        {/* FRIENDS MODAL */}
        {isFriendsModalOpen && (
          <Modal toggleModal={toggleFriendsModal}>
            <Friends currentUserId={currentUserId} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
