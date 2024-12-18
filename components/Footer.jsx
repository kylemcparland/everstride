import "./Footer.css";
import QuestInfo from "./QuestInfo";

const Footer = ({ distance_today, goal_distance, username }) => {
  return (
    <div className="Footer">
      {username && (
        <QuestInfo
          distance_today={distance_today}
          goal_distance={goal_distance}
        />
      )}
    </div>
  );
};

export default Footer;
