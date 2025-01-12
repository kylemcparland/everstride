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

  // Determine the location based on total_distance
  const location =
    userCharacter.total_distance_travelled >= 10000
      ? "The Cave of the Wandering Wyrm"
      : userCharacter.total_distance_travelled >= 8000
      ? "The Pacing Peaks"
      : userCharacter.total_distance_travelled >= 6000
      ? "The Strider's Stronghold"
      : userCharacter.total_distance_travelled >= 4000
      ? "Paceport Village"
      : userCharacter.total_distance_travelled >= 2000
      ? "The Wanderwillow Woods"
      : "The Fields of Frollicking";

  // Set the background image URL based on the location
  const backgroundImage = `/assets/scenes/${location
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase()}.png`;

  console.log(backgroundImage);

  console.log(
    `${userCharacter.name} has travelled ${userCharacter.total_distance_travelled} and is at the ${location}`
  );

  // Render character's distance travelled...
  return (
    <div
      className="StepVisualizer"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Apply dynamic background image
    >
      <div className="LocationDiv">
        <div className="StepVisualizer-textbackground">
          <p>
            {location} | 💰{userCharacter.gold}
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
        {distance_travelled_today !== goal_distance && <GoalIcon />}
      </div>
    </div>
  );
}
