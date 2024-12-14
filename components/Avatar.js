const Avatar = ({ hat, shirt, pants, boots, weapon, colour }) => {
  return (
      <div className="avatar-display">
        <img
          src="/assets/avatars/avatar_base.png"
          alt="Avatar base"
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
            alt={hat.name}
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
  )
}

export default Avatar;