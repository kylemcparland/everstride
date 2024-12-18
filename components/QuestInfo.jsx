import "./QuestInfo.css";

const QuestInfo = ({ distance_today, goal_distance }) => {
  return (
    <div className="QuestInfo">
      {/* Conditionally display upon reaching goal. */}
      {distance_today < goal_distance ? (
        <div>
          <b>Current Quest: The Trail of the Everstride</b>
          <br />
          Brave Adventurer, journey through the Plains of Perpetual Motion and
          conquer the Glade of Nimble Steps. Achieve 30,000 steps to reach the
          Sanctuary of Vitality and claim the title of Everstride Champion!
          <br />
          <br />
          <b>Keep going! Only {goal_distance - distance_today} more to go!</b>
        </div>
      ) : (
        <div>
          <b>Quest Completed!</b>
          <br />
          With the final step, you enter the Sanctuary of Vitality, your body
          brimming with energy as the title of Everstride Champion is bestowed
          upon you. Just as you begin to bask in your victory, a rustle from the
          nearby trees catches your attention. From the shadows, a group of
          bandits emerges, eyes glinting with greed. The path forward is now
          blocked, and you must decide: Will you{" "}
          <b>negotiate with the bandits to avoid conflict</b>, or{" "}
          <b>draw your weapon and face them head-on?</b>
        </div>
      )}
    </div>
  );
};

export default QuestInfo;
