import "./StepVisualizer.css";
import Avatar from "./Avatar";
import GoalIcon from "./GoalIcon";

export default function StepVisualizer({
  userCharacter,
  hat,
  shirt,
  pants,
  boots,
  weapon,
  goal_distance,
}) {
  // Deconstruct stats from userCharacter...
  let { name, distance_travelled_today, user_tag } = userCharacter;

  // Protect against over-max distance travelled...
  if (distance_travelled_today > goal_distance) {
    distance_travelled_today = goal_distance;
  }

  // Calculate the position of the character based on distance travelled...
  const position = 10 + (distance_travelled_today / goal_distance) * 80;
  const goalPosition = 10 + 1 * 80;

  // Render character's distance travelled...
  return (
    <div className="StepVisualizer">
      <div className="StepVisualizer-progress">
        {user_tag === "current_user" ? (
          <p>
            (debug - distance_travelled_today): {distance_travelled_today}/
            {goal_distance} [💰
            {userCharacter.gold}]
          </p>
        ) : (
          <p>
            {name}'s progress (distance_travelled_today): {distance_travelled_today}/{goal_distance} [💰
            {userCharacter.gold}]
          </p>
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
          colour={userCharacter.colour}
        />
      </div>
      <div
        className="StepVisualizer-goal"
        style={{ left: `calc(${goalPosition}% - 0.8em)` }}
      >
        <GoalIcon />
      </div>
    </div>
  );
}
