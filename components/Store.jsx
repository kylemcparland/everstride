"use client";

import "./Store.css";
import { useState } from "react";
import ConfirmButton from "./ConfirmButton";
import PurchaseGoldStripe from "@/components/PurchaseGoldStripe";

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
      <h2 className='Title'>Market | 💰{user.gold}</h2>
      <div className="Store-body">
        {/* HATS */}
        <h2>Hats</h2>
        <div className="Store-category">
          {hats.map((hat) => (
            <div className="Store-item" key={hat.id}>
              <>
                <p>{hat.name}</p>
                <p className="Item-price">💰{hat.price}</p>
              </>

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
                  userGold={user.gold}
                  itemPrice={hat.price}
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
        <h2>Shirts</h2>
        <div className="Store-category">
          {shirts.map((shirt) => (
            <div className="Store-item" key={shirt.id}>
              <>
                <p className='Item-name'>{shirt.name}</p>
                <p className="Item-price">💰{shirt.price}</p>
              </>

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
              ) : confirmPurchase === shirt.id ? (
                <ConfirmButton
                  setConfirmPurchase={setConfirmPurchase}
                  userId={user.id}
                  itemId={shirt.id}
                  userGold={user.gold}
                  itemPrice={shirt.price}
                />
              ) : (
                <button onClick={() => toggleConfirmPurchase(shirt.id)}>
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
        <h2>Pants</h2>
        <div className="Store-category">
          {pants.map((pants) => (
            <div className="Store-item" key={pants.id}>
              <>
                <p>{pants.name}</p>
                <p className="Item-price">💰{pants.price}</p>
              </>

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
              ) : confirmPurchase === pants.id ? (
                <ConfirmButton
                  setConfirmPurchase={setConfirmPurchase}
                  userId={user.id}
                  itemId={pants.id}
                  userGold={user.gold}
                  itemPrice={pants.price}
                />
              ) : (
                <button onClick={() => toggleConfirmPurchase(pants.id)}>
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
        <h2>Boots</h2>
        <div className="Store-category">
          {boots.map((boots) => (
            <div className="Store-item" key={boots.id}>
              <>
                <p>{boots.name}</p>
                <p className="Item-price">💰{boots.price}</p>
              </>

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
              ) : confirmPurchase === boots.id ? (
                <ConfirmButton
                  setConfirmPurchase={setConfirmPurchase}
                  userId={user.id}
                  itemId={boots.id}
                  userGold={user.gold}
                  itemPrice={boots.price}
                />
              ) : (
                <button onClick={() => toggleConfirmPurchase(boots.id)}>
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
        <h2>Weapons</h2>
        <div className="Store-category">
          {weapons.map((weapon) => (
            <div className="Store-item" key={weapon.id}>
              <>
                <p>{weapon.name}</p>
                <p className="Item-price">💰{weapon.price}</p>
              </>

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
              ) : confirmPurchase === weapon.id ? (
                <ConfirmButton
                  setConfirmPurchase={setConfirmPurchase}
                  userId={user.id}
                  itemId={weapon.id}
                  userGold={user.gold}
                  itemPrice={weapon.price}
                />
              ) : (
                <button onClick={() => toggleConfirmPurchase(weapon.id)}>
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
      {/* TESTING PURCHASE GOLD LINK */}
      <div className="Store-Stripe-Banner">
        <PurchaseGoldStripe />
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
