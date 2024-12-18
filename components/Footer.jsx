import "./Footer.css";
import QuestInfo from "./QuestInfo";

const Footer = ({ distance_today }) => {
  return (
    <div className="Footer">
      <QuestInfo distance_today={distance_today}/>
    </div>
  );
};

export default Footer;
