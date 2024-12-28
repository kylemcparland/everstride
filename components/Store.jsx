"use client";

import "./Store.css";
import { useState } from "react";
import ConfirmButton from "./ConfirmButton";

const Store = ({ userItems, allItems, user }) => {
  // Confirm purchase:
  const [confirmPurchase, setConfirmPurchase] = useState(false);
  const toggleConfirmPurchase = (itemId) => {
    setConfirmPurchase((prevId) => (prevId === itemId ? null : itemId));
  };

  // Sort all items for store display...
  const hats = allItems.filter((item) => item.type === "hat");
  const shirts = allItems.filter((item) => item.type === "shirt");
  const pants = allItems.filter((item) => item.type === "pants");
  const boots = allItems.filter((item) => item.type === "boots");
  const weapons = allItems.filter((item) => item.type === "weapon");

  // Create SET for conditional SOLD OUT display...
  const ownedItemIds = new Set(
    Object.values(userItems)
      .flat()
      .map((item) => item.id)
  );

  return (
    <div className="Store">
      <h1>Store</h1>
      <h2>Your Gold: 💰{user.gold}</h2>

      <div className="Store-body">
        {/* HATS */}
        <h2>-- Purchase Hats --</h2>
        <div className="Store-category">
          {hats.map((hat) => (
            <div className="Store-item" key={hat.id}>
              <p>
                {hat.name} 💰:{hat.price}
              </p>

              {/* Conditionally display item if not owned */}
              {ownedItemIds.has(hat.id) ? (
                <button disabled className="Store-item-owned">
                  <img
                    src={`assets/hats/${hat.image}`}
                    alt={hat.name}
                    className="Store-item-thumbnail"
                    title={hat.name}
                  />
                  <h3 className="Store-item-owned-SOLD">SOLD OUT!</h3>
                </button>
              ) : confirmPurchase === hat.id ? (
                <ConfirmButton
                  setConfirmPurchase={setConfirmPurchase}
                  userId={user.id}
                  itemId={hat.id}
                />
              ) : (
                <button onClick={() => toggleConfirmPurchase(hat.id)}>
                  <img
                    src={`assets/hats/${hat.image}`}
                    alt={hat.name}
                    className="Store-item-thumbnail"
                    title={hat.name}
                  />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* SHIRTS */}
        <h2>-- Purchase Shirts --</h2>
        <div className="Store-category">
          {shirts.map((shirt) => (
            <div className="Store-item" key={shirt.id}>
              <p>
                {shirt.name} 💰:{shirt.price}
              </p>

              {/* Conditionally display item if not owned */}
              {ownedItemIds.has(shirt.id) ? (
                <button disabled className="Store-item-owned">
                  <img
                    src={`assets/shirts/${shirt.image}`}
                    alt={shirt.name}
                    className="Store-item-thumbnail"
                    title={shirt.name}
                  />
                  <h3 className="Store-item-owned-SOLD">SOLD OUT!</h3>
                </button>
              ) : (
                <button>
                  <img
                    src={`assets/shirts/${shirt.image}`}
                    alt={shirt.name}
                    className="Store-item-thumbnail"
                    title={shirt.name}
                  />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* PANTS */}
        <h2>-- Purchase Pants --</h2>
        <div className="Store-category">
          {pants.map((pants) => (
            <div className="Store-item" key={pants.id}>
              <p>
                {pants.name} 💰:{pants.price}
              </p>

              {/* Conditionally display item if not owned */}
              {ownedItemIds.has(pants.id) ? (
                <button disabled className="Store-item-owned">
                  <img
                    src={`assets/pants/${pants.image}`}
                    alt={pants.name}
                    className="Store-item-thumbnail"
                    title={pants.name}
                  />
                  <h3 className="Store-item-owned-SOLD">SOLD OUT!</h3>
                </button>
              ) : (
                <button>
                  <img
                    src={`assets/pants/${pants.image}`}
                    alt={pants.name}
                    className="Store-item-thumbnail"
                    title={pants.name}
                  />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* BOOTS */}
        <h2>-- Purchase Boots --</h2>
        <div className="Store-category">
          {boots.map((boots) => (
            <div className="Store-item" key={boots.id}>
              <p>
                {boots.name} 💰:{boots.price}
              </p>

              {/* Conditionally display item if not owned */}
              {ownedItemIds.has(boots.id) ? (
                <button disabled className="Store-item-owned">
                  <img
                    src={`assets/boots/${boots.image}`}
                    alt={boots.name}
                    className="Store-item-thumbnail"
                    title={boots.name}
                  />
                  <h3 className="Store-item-owned-SOLD">SOLD OUT!</h3>
                </button>
              ) : (
                <button>
                  <img
                    src={`assets/boots/${boots.image}`}
                    alt={boots.name}
                    className="Store-item-thumbnail"
                    title={boots.name}
                  />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* WEAPONS */}
        <h2>-- Purchase Weapons --</h2>
        <div className="Store-category">
          {weapons.map((weapon) => (
            <div className="Store-item" key={weapon.id}>
              <p>
                {weapon.name} 💰:{weapon.price}
              </p>

              {/* Conditionally display item if not owned */}
              {ownedItemIds.has(weapon.id) ? (
                <button disabled className="Store-item-owned">
                  <img
                    src={`assets/weapons/${weapon.image}`}
                    alt={weapon.name}
                    className="Store-item-thumbnail"
                    title={weapon.name}
                  />
                  <h3 className="Store-item-owned-SOLD">SOLD OUT!</h3>
                </button>
              ) : (
                <button>
                  <img
                    src={`assets/weapons/${weapon.image}`}
                    alt={weapon.name}
                    className="Store-item-thumbnail"
                    title={weapon.name}
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;

/* 
{hats.map((hat) => (
  <button key={hat.id} onClick={() => handleSelect("hat", hat)}>
  <img
    src={`assets/hats/${hat.image}`}
    alt={hat.name}
    className="Store-item-thumbnail"
    title={hat.name}
  />
</button>
))}
*/
