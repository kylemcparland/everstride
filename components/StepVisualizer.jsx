import "./StepVisualizer.css";

const StepVisualizer = ({ userCharacter }) => {
  // Deconstruct stats from userCharacter...
  let { name, distance_travelled_today, gold } = userCharacter;

  // Protect against over-max distance travelled...
  if (distance_travelled_today > 1000) {
    distance_travelled_today = 1000;
  }

  // Calculate the position of the character based on distance travelled...
  const position = 10 + (distance_travelled_today / 1000) * 80; // 0/1000 = left:10% and 1000/1000 = left:90%

  // Render character's distance travelled...
  return (
    <div className="step-visualizer">
      <h1>{name}</h1>
      <h2>{distance_travelled_today}/1000</h2>
      <div
        className="step-visualizer-character"
        style={{ left: `${position}%` }}
      >
        🚹 {gold}🪙
        {/* Replace above emoji with avatar */}
      </div>
    </div>
  );
};

export default StepVisualizer;
