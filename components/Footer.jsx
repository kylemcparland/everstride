import "./Footer.css";
import QuestInfo from "./QuestInfo";

const Footer = ({ distance_today, goal_distance, username, currentQuest }) => {
  return (
    <div className="Footer">
      {username && (
        <QuestInfo
          distance_today={distance_today}
          goal_distance={goal_distance}
          currentQuest={currentQuest}
        />
      )}
    </div>
  );
};

export default Footer;
