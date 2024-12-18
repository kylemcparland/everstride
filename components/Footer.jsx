import "./Footer.css";
import QuestInfo from "./QuestInfo";

const Footer = ({ distance_today, goal_distance }) => {
  return (
    <div className="Footer">
      <QuestInfo distance_today={distance_today} goal_distance={goal_distance}/>
    </div>
  );
};

export default Footer;
