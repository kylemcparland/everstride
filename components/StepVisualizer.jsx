"use client"; // Mark this component as a Client Component

import "./StepVisualizer.css";
import Avatar from "./Avatar";
import GoalIcon from "./GoalIcon";
import { useEffect, useState } from "react";

export default function StepVisualizer({
  isMainUser,
  userCharacter,
  hat,
  shirt,
  pants,
  boots,
  weapon,
  goal_distance,
}) {
  // Deconstruct stats from userCharacter...
  let { name, distance_travelled_today } = userCharacter;

  // Protect against over-max distance travelled...
  if (distance_travelled_today > goal_distance) {
    distance_travelled_today = goal_distance;
  }

  // fetchGold to fetch gold amount from the database
  const [gold, setGold] = useState(0);

  useEffect(() => {
    fetch("/api/fetchGold", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.gold !== undefined) {
          setGold(data.gold);
        } else {
          console.error("Failed to fetch gold value");
        }
      })
      .catch((error) => {
        console.error("Error fetching gold value:", error);
      });
  }, [name]);

  // Calculate the position of the character based on distance travelled...
  const position = 10 + (distance_travelled_today / goal_distance) * 80;
  const goalPosition = 10 + 1 * 80;

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
      <h2>{gold}🪙</h2>
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
      <div
        className="StepVisualizer-goal"
        style={{ left: `calc(${goalPosition}% - 0.8em)` }}
      >
        <GoalIcon />
      </div>
    </div>
  );
}
