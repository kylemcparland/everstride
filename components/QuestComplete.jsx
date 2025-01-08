"use client";

const QuestComplete = ({ currentQuest }) => {
  const userQuestId = currentQuest.user_quests_id;
  const userId = currentQuest.user_id;
  const updatedUserGold = currentQuest.user_gold + 10;
  // console.log(userQuestId, userId, updatedUserGold);

  async function completeCurrentQuest(userQuestId, userId, updatedUserGold) {
    const response = await fetch("/api/completeQuest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userQuestId, userId, updatedUserGold }),
    });

    const result = await response.json();
    if (result.success) {
      console.log(result.message);
      window.location.reload();
    } else {
      console.error(result.message);
    }
  }

  return (
    <div>
      <button
        onClick={() =>
          completeCurrentQuest(userQuestId, userId, updatedUserGold)
        }
      >
        Complete Quest
      </button>
    </div>
  );
};

export default QuestComplete;
