import "./StepVisualizer.css";
import Avatar from "./Avatar";
import GoalIcon from "./GoalIcon";
import { getLocation } from "@/pages/api/location";

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

  // Determine the location based on total_distance (Moved to pages/api location.js)
  const location = getLocation(userCharacter.total_distance_travelled);

  // Set the background image URL based on the location
  const backgroundImage = `/assets/scenes/${location
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase()}.png`;

  // Render character's distance travelled...
  return (
    <div
      className="StepVisualizer"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Apply dynamic background image
    >
      <div className="LocationDiv">
        <div className="StepVisualizer-textbackground">
          <p>{location}</p>
          <p className="StepVisualizer-gold">
            &nbsp;&nbsp;💰{userCharacter.gold}
          </p>
        </div>
      </div>
      <div className="StepVisualizer-progress">
        <div className="StepVisualizer-textbackground">
          {user_tag === "current_user" ? (
            <p>
              Today you have travelled {distance_travelled_today}/
              {goal_distance}m
            </p>
          ) : (
            <p>
              Today {name} has travelled {distance_travelled_today}m
            </p>
          )}
        </div>
      </div>
      <div className="DivThree"></div>

      <div
        className="StepVisualizer-character"
        style={{ left: `calc(${position}% - 5em)` }}
      >
        <Avatar
          hat={hat}
          shirt={shirt}
          pants={pants}
          boots={boots}
          weapon={weapon}
          colour={userCharacter.colour}
          animate={true}
        />
      </div>
      <div
        className="StepVisualizer-goal"
        style={{ left: `calc(${goalPosition}% - 0.8em)` }}
      >
        <GoalIcon
          distance_travelled_today={distance_travelled_today}
          goal_distance={goal_distance}
        />
      </div>
    </div>
  );
}
