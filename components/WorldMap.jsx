import { useEffect, useState } from 'react';

// Example locations (latitude, longitude or coordinates on the map)
const locations = [
  { name: "Start", x: 100, y: 350 },
  { name: "Woods", x: 250, y: 300},
  { name: "Village", x: 350, y: 150 },
  { name: "Castle", x: 500, y: 350 },
  { name: "Mountain", x: 650, y: 300 },
  { name: "Dragon's Lair", x: 750, y: 150 },
];

export const WorldMap = ({ steps, totalSteps }) => {
  const [avatarPosition, setAvatarPosition] = useState({ x: 100, y: 350 }); // Set starting point

  useEffect(() => {
    const percentage = steps / totalSteps; // Normalize steps to 0-1 range
    const targetLocationIndex = Math.floor(percentage * (locations.length - 1));

    // Calculate the avatar's position between locations
    const startLocation = locations[targetLocationIndex];
    const endLocation = locations[targetLocationIndex + 1] || startLocation;

    // Interpolate between start and end location based on step percentage
    const x = startLocation.x + (endLocation.x - startLocation.x) * (percentage * (locations.length - 1) - targetLocationIndex);
    const y = startLocation.y + (endLocation.y - startLocation.y) * (percentage * (locations.length - 1) - targetLocationIndex);

    setAvatarPosition({ x, y });
  }, [steps]);

  // Function to draw the path between locations and display location names
  const drawPath = () => {
    const path = [];
    for (let i = 0; i < locations.length - 1; i++) {
      path.push(
        <line
          key={i}
          x1={locations[i].x}
          y1={locations[i].y}
          x2={locations[i + 1].x}
          y2={locations[i + 1].y}
          stroke="red"
          strokeWidth="2"
          strokeDasharray="4, 4" // Creates a dotted line pattern
        />
      );
    }
  
    // Add text labels for each location
    locations.forEach((location, index) => {
      path.push(
        <text
          key={`text-${index}`}
          x={location.x + 10} // Add some offset to avoid overlap with the point
          y={location.y + 35} // Adjust to position text above the point
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
    <div className="map-container" style={{ position: 'relative', width: '50%', height: '50%' }}>
      <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {drawPath()}
        {/* Draw the moving red circle (avatar) */}
        <circle cx={avatarPosition.x} cy={avatarPosition.y} r="10" fill="red" />
      </svg>
      <img
        src="assets/worldmap/worldmap.png" // Replace with the actual world map image path
        alt="World Map"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Add location-specific images */}
      {locations.map((location, index) => (
        <img
          key={index}
          src={`assets/objects/${location.name}.png`} // Use location name for the image path
          alt={location.name}
          style={{
            position: 'absolute',
            top: `${location.y - 90}px`,  // Adjust for image size (example: 30px image, offset by half the size)
            left: `${location.x - 60}px`, // Adjust for image size
            width: '120px',  // You can adjust this based on your image size
            height: '120px' // You can adjust this based on your image size
          }}
        />
      ))}
    </div>
  );
};