"use client";

const QuestComplete = ({ currentQuest }) => {

  const userQuestId = currentQuest.user_quests_id;
  const userId = currentQuest.user_id;
  console.log(userQuestId, userId);

  async function completeCurrentQuest(userQuestId, userId) {
    const response = await fetch("/api/completeQuest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userQuestId, userId }),
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
      <button onClick={() => completeCurrentQuest(userQuestId, userId)}>Complete Quest</button>
    </div>
  );
};

export default QuestComplete;
