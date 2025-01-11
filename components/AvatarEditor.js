"use client";

import "./AvatarEditor.css"; // Assuming you're using an external CSS file
import Avatar from "./Avatar.js";
import React, { useState } from "react";

const AvatarEditor = ({
  hats,
  shirts,
  pants,
  boots,
  weapons,
  user,
  userEquipment,
}) => {
  // State for selected items
  const [selectedHat, setSelectedHat] = useState(userEquipment.hat);
  const [selectedShirt, setSelectedShirt] = useState(userEquipment.shirt);
  const [selectedPants, setSelectedPants] = useState(userEquipment.pants);
  const [selectedBoots, setSelectedBoots] = useState(userEquipment.boots);
  const [selectedWeapon, setSelectedWeapon] = useState(userEquipment.weapon);
  const [selectedColor, setSelectedColor] = useState(user.colour || "base"); // Set default to base color

  const handleSelect = (type, item) => {
    switch (type) {
      case "hat":
        setSelectedHat(item);
        break;
      case "shirt":
        setSelectedShirt(item);
        break;
      case "pants":
        setSelectedPants(item);
        break;
      case "boots":
        setSelectedBoots(item);
        break;
      case "weapon":
        setSelectedWeapon(item);
        break;
      default:
        break;
    }
  };

  const handleDeselect = (type) => {
    switch (type) {
      case "hat":
        setSelectedHat(null);
        break;
      case "shirt":
        setSelectedShirt(null);
        break;
      case "pants":
        setSelectedPants(null);
        break;
      case "boots":
        setSelectedBoots(null);
        break;
      case "weapon":
        setSelectedWeapon(null);
        break;
      default:
        break;
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleEquip = async () => {
    if (!user || !user.id) {
      console.error("User or user.id is undefined");
      return;
    }

    const response = await fetch("/api/updateAvatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        hatId: selectedHat?.id || null,
        shirtId: selectedShirt?.id || null,
        pantsId: selectedPants?.id || null,
        bootsId: selectedBoots?.id || null,
        weaponId: selectedWeapon?.id || null,
        avatarColor: selectedColor, // Send the selected color
      }),
    });

    const data = await response.json();
    if (data.message === "Equipment updated successfully!") {
      console.log("Equipment updated!");
      window.location.reload();
    } else {
      console.error("Error updating equipment:", data.message);
    }
  };

  return (
    <div className="avatar-editor-container">
      <h3 className="avatar-editor-title">Avatar Editor</h3>

      {/* Display the Avatar */}
      <Avatar
        hat={selectedHat}
        shirt={selectedShirt}
        pants={selectedPants}
        boots={selectedBoots}
        weapon={selectedWeapon}
        colour={selectedColor} // Pass the selected color to Avatar component
      />

      {/* Equipment Selection */}
      <div className="equipment-selection">
        {/* Avatar Color Selection */}
        <div className="equipment-category">
          <h5>Colour</h5>
          {[
            "base",
            "blue",
            "green",
            "limegreen",
            "orange",
            "pink",
            "purple",
            "red",
            "turquoise",
            "yellow",
          ].map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
              title={color}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Hats */}
        <div className="equipment-category">
          <h5>Hats</h5>
          <button onClick={() => handleDeselect("hat")}>⬇️</button>
          {hats.map((hat) => (
            <button key={hat.id} onClick={() => handleSelect("hat", hat)}>
              <img
                src={`assets/hats/${hat.image}`}
                alt={hat.name}
                className="equipment-thumbnail"
                title={hat.name}
              />
            </button>
          ))}
        </div>

        {/* Shirts */}
        <div className="equipment-category">
          <h5>Shirts</h5>
          <button onClick={() => handleDeselect("shirt")}>⬇️</button>
          {shirts.map((shirt) => (
            <button key={shirt.id} onClick={() => handleSelect("shirt", shirt)}>
              <img
                src={`assets/shirts/${shirt.image}`}
                alt={shirt.name}
                className="equipment-thumbnail"
                title={shirt.name}
              />
            </button>
          ))}
        </div>

        {/* Pants */}
        <div className="equipment-category">
          <h5>Pants</h5>
          <button onClick={() => handleDeselect("pants")}>⬇️</button>
          {pants.map((pant) => (
            <button key={pant.id} onClick={() => handleSelect("pants", pant)}>
              <img
                src={`assets/pants/${pant.image}`}
                alt={pant.name}
                className="equipment-thumbnail"
                title={pant.name}
              />
            </button>
          ))}
        </div>

        {/* Boots */}
        <div className="equipment-category">
          <h5>Boots</h5>
          <button onClick={() => handleDeselect("boots")}>⬇️</button>
          {boots.map((boot) => (
            <button key={boot.id} onClick={() => handleSelect("boots", boot)}>
              <img
                src={`assets/boots/${boot.image}`}
                alt={boot.name}
                className="equipment-thumbnail"
                title={boot.name}
              />
            </button>
          ))}
        </div>

        {/* Weapons */}
        <div className="equipment-category">
          <h5>Weapons</h5>
          <button onClick={() => handleDeselect("weapon")}>⬇️</button>
          {weapons.map((weapon) => (
            <button
              key={weapon.id}
              onClick={() => handleSelect("weapon", weapon)}
            >
              <img
                src={`assets/weapons/${weapon.image}`}
                alt={weapon.name}
                className="equipment-thumbnail"
                title={weapon.name}
              />
            </button>
          ))}
        </div>

        {/* Equip Button */}
        <button className="equip-button" onClick={handleEquip}>
          Equip
        </button>
      </div>
    </div>
  );
};

export default AvatarEditor;
