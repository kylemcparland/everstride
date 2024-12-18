import "./QuestInfo.css";

const QuestInfo = ({ distance_today }) => {
  return (
    <div className="QuestInfo">
      {/* Conditionally display upon reaching goal. */}
      {distance_today < 1000 ? (
        <div>
          <b>Current Quest: The Trail of the Everstride</b>
          <br />
          Brave Adventurer, journey through the Plains of Perpetual Motion and
          conquer the Glade of Nimble Steps. Achieve 30,000 steps to reach the
          Sanctuary of Vitality and claim the title of Everstride Champion!
          <br />
          <br />
          <b>Keep going! Only {1000 - distance_today} more to go!</b>
        </div>
      ) : (
        <div>QUEST COMPLETE!!!!</div>
      )}
    </div>
  );
};

export default QuestInfo;
