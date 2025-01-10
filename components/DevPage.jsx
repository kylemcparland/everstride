import { useState } from "react";
import "./DevPage.css";

const DevPage = ({ user }) => {
  const [distance, setDistance] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/userUpdater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user.name,
          distance: parseFloat(distance),
        }),
      });

      const result = await response.json();
      console.log(result.message);
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating distance:", error);
    }
  };

  return (
    <div className="devParent">
      {user.name === "Jon Hiebert" ? (
        <div className="devContainerCon">
          <p>Strava is connected! Use the Strava app!</p>
        </div>
      ) : (
        <div className="devContainerNotCon">
          <p>Strava is not connected! Add your progress below.</p>
        </div>
      )}
      <div className="devContainerAdd">
        <p>How many steps or meters?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <button
            type="submit"
            className="Add"
            disabled={user.name === "Jon Hiebert"}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default DevPage;
