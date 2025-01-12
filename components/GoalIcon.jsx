import "./GoalIcon.css";

const GoalIcon = ({ distance_travelled_today, goal_distance }) => {
  const icon = distance_travelled_today == goal_distance ? "❗" : "🌟";

  return <div>{icon}</div>;
};

export default GoalIcon;
