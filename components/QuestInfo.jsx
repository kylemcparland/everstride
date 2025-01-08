import QuestComplete from "./QuestComplete";
import "./QuestInfo.css";

const QuestInfo = ({ distance_today, goal_distance, currentQuest }) => {
  // console.log(currentQuest);

  const { quest_name, description } = currentQuest;

  return (
    <div className="QuestInfo">
      {/* Conditionally display upon reaching goal. */}
      {distance_today < goal_distance ? (
        <div>
          <b>Current Quest: {quest_name}</b>
          <br />
          {description}
          <br />
          <br />
          <b>Keep going! Only {goal_distance - distance_today} more to go!</b>
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
