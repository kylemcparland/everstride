import { useState } from "react";
import "./DevPage.css";
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";

const DevPage = ({ user }) => {
  const [distance, setDistance] = useState("");
  const [username] = useState(user.name);
  // Get the logged in users name for the Strava API loader which is reused from Login.jsx;

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

  // Strava API loader which is reused from Login.jsx;
  const handleLoadStrava = async () => {
    try {
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      window.location.href = "/";
    } catch (error) {
      console.error("handleGetAPIUpdates error");
    }
  };

  return (
    <div className="devParent">
      {user.name === "Jon Hiebert" ? (
        <div className="devContainerCon">
          <>
            <p>Strava app connected. Updated on login.</p>
            <button onClick={handleLoadStrava}>Check Now!</button>
          </>
        </div>
      ) : (
        <div className="devContainerNotCon">
          <>
            <p>No app connection. Add your progress here!</p>
          </>
        </div>
      )}
      <div className="devContainerAdd">
        <p>How many steps or meters?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            disabled={user.name === "Jon Hiebert"}
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
