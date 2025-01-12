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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faStore,
  faUserPlus,
  faMap,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

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
      {/* AVATAR DESKTOP */}
      <Link href="" className="desktop-button">
        <button onClick={toggleAvatarModal} className="NavLinks-button">
          <p className="a">Avatar Editor</p>
        </button>
      </Link>

      {/* AVATAR MOBILE */}
      <Link href="" className="mobile-button">
        <button onClick={toggleAvatarModal} className="NavLinks-button">
          <p className="a">
            <FontAwesomeIcon icon={faUserPen} />
          </p>
        </button>
      </Link>

      {/* STORE DESKTOP */}
      <Link href="" className="desktop-button">
        <button onClick={toggleStoreModal} className="NavLinks-button">
          <p className="a">Gold Market</p>
        </button>
      </Link>

      {/* STORE MOBILE */}
      <Link href="" className="mobile-button">
        <button onClick={toggleStoreModal} className="NavLinks-button">
          <p className="a">
            <FontAwesomeIcon icon={faStore} />
          </p>
        </button>
      </Link>

      {/* FRIENDS DESKTOP */}
      <Link href="" className="desktop-button">
        <button onClick={toggleFriendsModal} className="NavLinks-button">
          <p className="a">My Friends</p>
        </button>
      </Link>

      {/* FRIENDS MOBILE */}
      <Link href="" className="mobile-button">
        <button onClick={toggleFriendsModal} className="NavLinks-button">
          <p className="a">
            <FontAwesomeIcon icon={faUserPlus} />
          </p>
        </button>
      </Link>

      {/* MAP DESKTOP */}
      <Link href="" className="desktop-button">
        <button onClick={toggleMapModal} className="NavLinks-button">
          <p className="a">World Map</p>
        </button>
      </Link>

      {/* MAP MOBILE */}
      <Link href="" className="mobile-button">
        <button onClick={toggleMapModal} className="NavLinks-button">
          <p className="a">
            <FontAwesomeIcon icon={faMap} />
          </p>
        </button>
      </Link>

      {/* PROGRESS DESKTOP */}
      <Link href="" className="desktop-button">
        <button onClick={toggleDevModal} className="NavLinks-button">
          <p className="a">Add Progress</p>
        </button>
      </Link>

      {/* PROGRESS MOBILE */}
      <Link href="" className="mobile-button">
        <button onClick={toggleDevModal} className="NavLinks-button">
          <p className="a">
            <FontAwesomeIcon icon={faLocationDot} />
          </p>
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
            <DevPage user={user} />
          </Modal>
        )}

        {/* MAP MODAL */}
        {isMapModalOpen && (
          <Modal toggleModal={toggleMapModal}>
            <WorldMap
              steps={user.total_distance_travelled}
              totalSteps={10000}
            />
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
