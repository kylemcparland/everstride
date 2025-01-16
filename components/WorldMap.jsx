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

const scaleLocation = (x, y, containerDimensions) => ({
  x: (x / 800) * containerDimensions.width,
  y: (y / 500) * containerDimensions.height,
});

const Path = ({ start, end, containerDimensions }) => {
  const { x: startX, y: startY } = scaleLocation(start.x, start.y, containerDimensions);
  const { x: endX, y: endY } = scaleLocation(end.x, end.y, containerDimensions);
  return <line x1={startX} y1={startY} x2={endX} y2={endY} className="path" />;
};

const LocationLabel = ({ location, containerDimensions }) => {
  const { x, y } = scaleLocation(location.x, location.y, containerDimensions);
  const words = location.name.split(' ');

  return (
    <g className="location-labels">
      {words.map((word, wordIndex) => (
        <text key={wordIndex} x={x + 15} y={y - 50 + wordIndex * 20} className="location-text">
          {word}
        </text>
      ))}
    </g>
  );
};

const LocationImage = ({ location, containerDimensions }) => {
  const { x, y } = scaleLocation(location.x, location.y, containerDimensions);
  return (
    <img
      src={`assets/objects/${location.name}.png`}
      alt={location.name}
      className="location-image"
      style={{ top: `${y - 60}px`, left: `${x - 95}px` }}
    />
  );
};

export const WorldMap = ({ steps, totalSteps }) => {
  const [avatarPosition, setAvatarPosition] = useState({ x: 100, y: 350 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Adjust container dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      const { offsetWidth, offsetHeight } = containerRef.current || {};
      setContainerDimensions({ width: offsetWidth, height: offsetHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial dimension calculation
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update avatar position based on the current step and total steps
  useEffect(() => {
    const getAvatarPosition = () => {
      const percentage = Math.min(steps / totalSteps, 1);
      const targetLocationIndex = Math.floor(percentage * (locations.length - 1));
      const start = locations[targetLocationIndex];
      const end = locations[targetLocationIndex + 1] || start;

      // Interpolate position between two locations
      const x = start.x + (end.x - start.x) * (percentage * (locations.length - 1) - targetLocationIndex);
      const y = start.y + (end.y - start.y) * (percentage * (locations.length - 1) - targetLocationIndex);

      return scaleLocation(x, y, containerDimensions);
    };

    setAvatarPosition(getAvatarPosition());
  }, [steps, totalSteps, containerDimensions]);

  return (
    <div className="map-container" ref={containerRef}>
      <img src="assets/worldmap/worldmap.png" alt="World Map" className="world-map-image" />
      
      {/* Render location images */}
      {locations.slice(1).map((location, index) => (
        <LocationImage key={index} location={location} containerDimensions={containerDimensions} />
      ))}

      <svg className="svg-map">
        {/* Render path lines between locations */}
        {locations.map((start, i) => {
          const end = locations[i + 1];
          return end ? <Path key={i} start={start} end={end} containerDimensions={containerDimensions} /> : null;
        })}

        {/* Render labels for each location */}
        {locations.map((location, index) => (
          <LocationLabel key={index} location={location} containerDimensions={containerDimensions} />
        ))}

        {/* Render the avatar on the map */}
        <circle cx={avatarPosition.x} cy={avatarPosition.y} r="10" className="avatar" />
      </svg>
    </div>
  );
};