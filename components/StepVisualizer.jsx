import "./StepVisualizer.css";
import Avatar from "./Avatar";

const StepVisualizer = ({
  name,
  userCharacter,
  hat,
  shirt,
  pants,
  boots,
  weapon,
  goal_distance
}) => {
  // Deconstruct stats from userCharacter...
  let { distance_travelled_today } = userCharacter;

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
        <h2>
          {name} Progress: {distance_travelled_today}/{goal_distance}
        </h2>
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
