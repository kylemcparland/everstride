import "./StepVisualizer.css";
import Avatar from "./Avatar";

const StepVisualizer = ({
  isMainUser,
  userCharacter,
  hat,
  shirt,
  pants,
  boots,
  weapon,
  goal_distance,
}) => {
  // Deconstruct stats from userCharacter...
  let { name, distance_travelled_today } = userCharacter;

  // Protect against over-max distance travelled...
  if (distance_travelled_today > goal_distance) {
    distance_travelled_today = goal_distance;
  }

  // Calculate the position of the character based on distance travelled...
  const position = 10 + (distance_travelled_today / goal_distance) * 80;

  // Render character's distance travelled...
  return (
    <div className="StepVisualizer">
      <div className="StepVisualizer-progress">
        {isMainUser ? (
          <h2>
            Your progress: {distance_travelled_today}/{goal_distance}
          </h2>
        ) : (
          <h2>
            {name}'s progress: {distance_travelled_today}/{goal_distance}
          </h2>
        )}
      </div>

      <div
        className="StepVisualizer-character"
        style={{ left: `calc(${position}% - 3em)` }}
      >
        <Avatar
          hat={hat}
          shirt={shirt}
          pants={pants}
          boots={boots}
          weapon={weapon}
        />
      </div>
    </div>
  );
};

export default StepVisualizer;
