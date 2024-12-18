"use client"; // Mark this component as a Client Component

import "./StepVisualizer.css";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";

export default function StepVisualizer({
  userCharacter,
  hat,
  shirt,
  pants,
  boots,
  weapon,
}) {
  // Deconstruct stats from userCharacter...
  let { name, distance_travelled_today } = userCharacter;

  // Protect against over-max distance travelled...
  if (distance_travelled_today > 1000) {
    distance_travelled_today = 1000;
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
  const position = 10 + (distance_travelled_today / 1000) * 80; // 0/1000 = left:10% and 1000/1000 = left:90%

  // Render character's distance travelled...
  return (
    <div className="step-visualizer">
      <h1>{name}</h1>
      <h2>{distance_travelled_today}/1000</h2>
      <h2>{gold}🪙</h2>
      <div
        className="step-visualizer-character"
        style={{ left: `${position}%` }}
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
}
