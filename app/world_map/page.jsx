"use client";

import { useState } from 'react';
import { WorldMap } from '@/components/WorldMap';

export default function Home() {
  const [steps, setSteps] = useState(0);
  const totalSteps = 10000; // Set your goal step count

  // Simulating step increase (for testing purposes)
  const incrementSteps = () => setSteps(steps + 100);

  return (
    <div>
      <h1>Fantasy Step Tracker</h1>
      <button onClick={incrementSteps}>Add 100 Steps</button>
      <WorldMap steps={steps} totalSteps={totalSteps} />
      <p>{`Steps: ${steps} / ${totalSteps}`}</p>
    </div>
  );
}