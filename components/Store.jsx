"use client";
import "./Store.css";

const Store = ({ allItems }) => {
  // Sort all items for store display...
  const hats = allItems.filter((item) => item.type === "hat");
  const shirts = allItems.filter((item) => item.type === "shirt");
  const pants = allItems.filter((item) => item.type === "pants");
  const boots = allItems.filter((item) => item.type === "boots");
  const weapons = allItems.filter((item) => item.type === "weapon");

  return (
    <div className="Store">
      <h1>Store</h1>

      <div className="Store-body">
        {/* HATS */}
        <h2>Hats</h2>
        <div className="Store-category">
          {hats.map((hat) => (
            <div className="Store-item" key={hat.id}>
              <p>{hat.name}</p>
              <button>
                <img
                  src={`assets/hats/${hat.image}`}
                  alt={hat.name}
                  className="equipment-thumbnail"
                  title={hat.name}
                />
              </button>
            </div>
          ))}
        </div>

        {/* SHIRTS */}
        <h2>Shirts</h2>
        <div className="Store-category">
          {shirts.map((shirt) => (
            <div className="Store-item" key={shirt.id}>
              <p>{shirt.name}</p>
              <button>
                <img
                  src={`assets/shirts/${shirt.image}`}
                  alt={shirt.name}
                  className="equipment-thumbnail"
                  title={shirt.name}
                />
              </button>
            </div>
          ))}
        </div>

        {/* PANTS */}
        <h2>Pants</h2>
        <div className="Store-category">
          {pants.map((pants) => (
            <div className="Store-item" key={pants.id}>
              <p>{pants.name}</p>
              <button>
                <img
                  src={`assets/pants/${pants.image}`}
                  alt={pants.name}
                  className="equipment-thumbnail"
                  title={pants.name}
                />
              </button>
            </div>
          ))}
        </div>

        {/* BOOTS */}
        <div className="Store-category">
          <h2>Boots</h2>
          {boots.map((boots) => (
            <button key={boots.id}>
              <img
                src={`assets/boots/${boots.image}`}
                alt={boots.name}
                className="equipment-thumbnail"
                title={boots.name}
              />
            </button>
          ))}
        </div>

        {/* WEAPONS */}
        <div className="Store-category">
          <h2>Weapons</h2>
          {weapons.map((weapon) => (
            <button key={weapon.id}>
              <img
                src={`assets/weapons/${weapon.image}`}
                alt={weapon.name}
                className="equipment-thumbnail"
                title={weapon.name}
              />
            </button>
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
    className="equipment-thumbnail"
    title={hat.name}
  />
</button>
))}
*/
