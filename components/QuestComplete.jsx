"use client";

import { useState } from "react";

const QuestComplete = ({ currentQuest }) => {
  const [resultsScreen, setResultsScreen] = useState({
    message: null,
    gold: null,
  });

  // Unpack quest object...
  const {
    option_1,
    option_2,
    odds1,
    odds2,
    result_description,
    success_message,
    failure_message,
  } = currentQuest;

  const userQuestId = currentQuest.user_quests_id;
  const questId = currentQuest.quest_id;
  const userId = currentQuest.user_id;

  // Initialize user gold for updating...
  let updatedUserGold = currentQuest.user_gold;
  const min = questId * 100;
  const max = min + 100;
  const randomGoldReward = Math.floor(Math.random() * (max - min + 1) + min);

  // Dice roll for quest rewards...
  const determineOutcome = (odds) => {
    const diceRoll = Math.floor(Math.random() * 100) + 1;
    return odds >= diceRoll;
  };

  async function completeCurrentQuest(
    userQuestId,
    userId,
    updatedUserGold,
    odds
  ) {
    const outcome = determineOutcome(odds);

    if (outcome) {
      updatedUserGold += randomGoldReward;
    }

    const response = await fetch("/api/completeQuest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userQuestId, userId, updatedUserGold, questId }),
    });

    const result = await response.json();
    if (result.success) {
      console.log(result.message);

      // Show the outcome of your choice...
      if (outcome) {
        setResultsScreen((prevState) => ({
          ...prevState,
          message: success_message,
          gold: randomGoldReward,
        }));
      } else {
        setResultsScreen((prevState) => ({
          ...prevState,
          message: failure_message,
        }));
      }

      // Reload the page after 5 seconds...
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      console.error(result.message);
    }
  }

  return (
    <div>
      {/* Display choices after quest is completed / Display results after option is selected */}
      {!resultsScreen.message ? (
        <div>
          <b>Quest Completed!</b>
          <br />
          {result_description}
          <button
            onClick={() =>
              completeCurrentQuest(userQuestId, userId, updatedUserGold, odds1)
            }
          >
            {option_1}
          </button>
          <button
            onClick={() =>
              completeCurrentQuest(userQuestId, userId, updatedUserGold, odds2)
            }
          >
            {option_2}
          </button>
        </div>
      ) : (
        <div>
          Result:
          {resultsScreen.message}{" "}
          {resultsScreen.gold && `You recieve 💰${resultsScreen.gold} gold!!`}
          <br />
          Starting new quest in 5 seconds...
        </div>
      )}
    </div>
  );
};

export default QuestComplete;
