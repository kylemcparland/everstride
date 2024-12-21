import './Avatar.css';  // Assuming you're using an external CSS file

const Avatar = ({ hat, shirt, pants, boots, weapon, colour }) => {

  // Determine the correct avatar base image based on the colour prop
  const avatarBaseSrc = `/assets/avatars/avatar_${colour.toLowerCase()}.png`; // Ensure the colour is in lowercase to match the filename

  return (
    <div className="avatar-display">
      {/* Dynamic avatar base */}
      <img
        src={avatarBaseSrc}
        alt={`Avatar base ${colour}`}
        className="avatar-base"
      />

      {/* Equipment Layer */}
      {hat && (
        <img
          src={`assets/hats/${hat.image}`}
          alt={hat.name}
          className="equipment-layer hat"
        />
      )}

      {shirt && (
        <img
          src={`assets/shirts/${shirt.image}`}
          alt={shirt.name}
          className="equipment-layer shirt"
        />
      )}

      {pants && (
        <img
          src={`assets/pants/${pants.image}`}
          alt={pants.name}
          className="equipment-layer pants"
        />
      )}

      {boots && (
        <img
          src={`assets/boots/${boots.image}`}
          alt={boots.name}
          className="equipment-layer boots"
        />
      )}

      {weapon && (
        <img
          src={`assets/weapons/${weapon.image}`}
          alt={weapon.name}
          className="equipment-layer weapon"
        />
      )}
    </div>
  );
};

export default Avatar;