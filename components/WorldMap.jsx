import { useEffect, useState, useRef } from 'react';
import './WorldMap.css';

// Example locations (latitude, longitude or coordinates on the map)
const locations = [
  { name: "Start", x: 100, y: 350 },
  { name: "Woods", x: 250, y: 300 },
  { name: "Village", x: 350, y: 150 },
  { name: "Castle", x: 500, y: 350 },
  { name: "Mountain", x: 600, y: 300 },
  { name: "Dragon's Lair", x: 650, y: 150 },
];

export const WorldMap = ({ steps, totalSteps }) => {
  const [avatarPosition, setAvatarPosition] = useState({ x: 100, y: 350 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Calculate scaling based on the container size
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth: width, offsetHeight: height } = containerRef.current;
        setContainerDimensions({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Ensure the percentage is clamped between 0 and 1
    const percentage = Math.min(steps / totalSteps, 1);

    const targetLocationIndex = Math.floor(percentage * (locations.length - 1));
    const startLocation = locations[targetLocationIndex];
    const endLocation = locations[targetLocationIndex + 1] || startLocation;

    // Interpolate between start and end location based on the step percentage
    const x = startLocation.x + (endLocation.x - startLocation.x) * (percentage * (locations.length - 1) - targetLocationIndex);
    const y = startLocation.y + (endLocation.y - startLocation.y) * (percentage * (locations.length - 1) - targetLocationIndex);

    // Scale positions based on the container size
    const scaledX = (x / 800) * containerDimensions.width; // Assume 800px is the original width of the map
    const scaledY = (y / 500) * containerDimensions.height; // Assume 500px is the original height of the map

    setAvatarPosition({ x: scaledX, y: scaledY });
  }, [steps, totalSteps, containerDimensions]);

  // Function to draw the path between locations and display location names
  const drawPath = () => {
    const path = [];
    for (let i = 0; i < locations.length - 1; i++) {
      const startLocation = locations[i];
      const endLocation = locations[i + 1];

      // Scale coordinates based on container size
      const startX = (startLocation.x / 800) * containerDimensions.width;
      const startY = (startLocation.y / 500) * containerDimensions.height;
      const endX = (endLocation.x / 800) * containerDimensions.width;
      const endY = (endLocation.y / 500) * containerDimensions.height;

      path.push(
        <line
          key={i}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="red"
          strokeWidth="2"
          strokeDasharray="4, 4"
        />
      );
    }

    // Add text labels for each location
    locations.forEach((location, index) => {
      const x = (location.x / 800) * containerDimensions.width;
      const y = (location.y / 500) * containerDimensions.height;
      
      path.push(
        <text
          key={`text-${index}`}
          x={x + 10} // Add some offset to avoid overlap with the point
          y={y + 75} // Adjust to position text above the point
          fill="black"
          fontSize="20"
        >
          {location.name}
        </text>
      );
    });

    return path;
  };

  return (
    <div
      className="map-container"
      ref={containerRef}
    >
      <svg className="svg-map">
        {drawPath()}
        {/* Draw the moving red circle (avatar) */}
        <circle cx={avatarPosition.x} cy={avatarPosition.y} r="10" fill="red" className="avatar" />
      </svg>
      <img
        src="assets/worldmap/worldmap.png" // Replace with the actual world map image path
        alt="World Map"
        className="world-map-image"
      />

      {/* Add location-specific images */}
      {locations.map((location, index) => {
  // Skip rendering image for "Start" location
  if (location.name === "Start") return null;

  const x = (location.x / 800) * containerDimensions.width;
  const y = (location.y / 500) * containerDimensions.height;

  return (
    <img
      key={index}
      src={`assets/objects/${location.name}.png`} // Use location name for the image path
      alt={location.name}
      className="location-image"
      style={{
        top: `${y - 60}px`,  // Adjust for image size (example: 30px image, offset by half the size)
        left: `${x - 60}px`, // Adjust for image size
      }}
    />
  );
})}
    </div>
  );
};