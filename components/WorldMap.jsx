import { useEffect, useState, useRef } from 'react';
import './WorldMap.css';

const locations = [
  { name: "Fields of Frollicking", x: 100, y: 375 },
  { name: "Wanderwillow Woods", x: 250, y: 325 },
  { name: "Paceport Village", x: 350, y: 175 },
  { name: "Strider's Stronghold", x: 450, y: 375 },
  { name: "Pacing Peaks", x: 600, y: 325 },
  { name: "Cave of the Wandering Wyrm", x: 650, y: 175 },
];

export const WorldMap = ({ steps, totalSteps }) => {
  const [avatarPosition, setAvatarPosition] = useState({ x: 100, y: 350 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Resize the container on window resize
  useEffect(() => {
    const handleResize = () => {
      const { offsetWidth, offsetHeight } = containerRef.current || {};
      setContainerDimensions({ width: offsetWidth, height: offsetHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update avatar position based on steps
  useEffect(() => {
    const getAvatarPosition = () => {
      const percentage = Math.min(steps / totalSteps, 1);
      const targetLocationIndex = Math.floor(percentage * (locations.length - 1));
      const start = locations[targetLocationIndex];
      const end = locations[targetLocationIndex + 1] || start;

      const x = start.x + (end.x - start.x) * (percentage * (locations.length - 1) - targetLocationIndex);
      const y = start.y + (end.y - start.y) * (percentage * (locations.length - 1) - targetLocationIndex);

      return {
        x: (x / 800) * containerDimensions.width,
        y: (y / 500) * containerDimensions.height,
      };
    };

    setAvatarPosition(getAvatarPosition());
  }, [steps, totalSteps, containerDimensions]);

  // Convert location coordinates to scaled coordinates
  const scaleLocation = (x, y) => ({
    x: (x / 800) * containerDimensions.width,
    y: (y / 500) * containerDimensions.height,
  });

  // Render paths between locations (lines)
  const renderPaths = () => {
    return locations.map((start, i) => {
      const end = locations[i + 1];
      if (end) {
        const { x: startX, y: startY } = scaleLocation(start.x, start.y);
        const { x: endX, y: endY } = scaleLocation(end.x, end.y);

        return (
          <line key={i} x1={startX} y1={startY} x2={endX} y2={endY} stroke="red" strokeWidth="2" strokeDasharray="4, 4" />
        );
      }
      return null;
    });
  };

  // Render stacked labels for each location
  const renderLocationLabels = () => {
    return locations.map((location, index) => {
      const { x, y } = scaleLocation(location.x, location.y);
      const words = location.name.split(' '); // Split the name into words

      return (
        <g key={index}>
          {words.map((word, wordIndex) => {
            return (
              <text
                key={wordIndex}
                x={x + 15}
                y={y - 50 + (wordIndex * 20)} // Stack words with some vertical space
                fill="black"
                fontSize={Math.max((containerDimensions.height / 500) * 20, 12)} // Adjusted font size scaling
                textAnchor="middle"
                pointerEvents="none"  // Ensures text doesn't interfere with mouse events
              >
                {word}
              </text>
            );
          })}
        </g>
      );
    });
  };

  // Render location images (all locations except "Start")
  const renderLocationImages = () => {
    return locations.slice(1).map((location, index) => {
      const { x, y } = scaleLocation(location.x, location.y);
      return (
        <img
          key={index}
          src={`assets/objects/${location.name}.png`}  // Ensure the image names match exactly
          alt={location.name}
          className="location-image"
          style={{ top: `${y - 60}px`, left: `${x - 95}px` }}
        />
      );
    });
  };

  return (
    <div className="map-container" ref={containerRef}>
      <img src="assets/worldmap/worldmap.png" alt="World Map" className="world-map-image" />
      
      {/* Render location images first */}
      {renderLocationImages()}
      
      <svg className="svg-map">
        {/* Render paths first, underneath everything */}
        {renderPaths()}

        {/* Render location labels on top of the lines */}
        {renderLocationLabels()} 

        {/* Avatar should be on top of everything */}
        <circle cx={avatarPosition.x} cy={avatarPosition.y} r="10" fill="red" className="avatar" />
      </svg>
    </div>
  );
};