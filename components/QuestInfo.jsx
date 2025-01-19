import QuestComplete from "./QuestComplete";
import "./QuestInfo.css";

const QuestInfo = ({ distance_today, goal_distance, currentQuest }) => {
  const { quest_name, description } = currentQuest;

  return (
    <div className="QuestInfo">
      {/* Conditionally display upon reaching goal. */}
      {distance_today < goal_distance ? (
        <div className="QuestInfo-body">
          <b className="QuestInfo-title">Current Quest: {quest_name}</b>
          <p className="QuestInfo-description">{description}</p>
          Keep going! Only {goal_distance - distance_today}m more to go!
        </div>
      ) : (
        <div>
          <QuestComplete currentQuest={currentQuest} />
        </div>
      )}
    </div>
  );
};

export default QuestInfo;
