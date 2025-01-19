"use client";

import { useEffect } from "react";
import "./ConfirmButton.css";

const ConfirmButton = ({
  setConfirmPurchase,
  userId,
  itemId,
  userGold,
  itemPrice,
}) => {
  // FUNCTION to query pages/api/addUserItems route...
  const buyItem = async () => {
    try {
      const response = await fetch("api/addUserItems", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ userId, itemId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Deduct the gold by calling updateUserGold
        const newGoldAmount = userGold - itemPrice;
        const goldResponse = await fetch("api/updateUserGold", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ userId, newGoldAmount }),
        });

        const goldData = await goldResponse.json();

        if (goldResponse.ok) {
          window.location.reload(); // Reload to reflect updated data
        } else {
          setError(goldData.error || "Failed to update gold");
          console.error(goldData.error);
        }
      } else {
        setError(data.error || "Failed to purchase item");
        console.error(data.error);
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error("Error:", err);
    }
  };

  // USEEFFECT called if not enough gold (error message timeout)...
  useEffect(() => {
    if (userGold < itemPrice) {
      const errorTimeout = setTimeout(() => {
        setConfirmPurchase();
      }, 1200);

      return () => clearTimeout(errorTimeout);
    }
  }, [userGold, itemPrice, setConfirmPurchase]);

  return (
    <div>
      {userGold >= itemPrice ? (
        <div className="ConfirmButton">
          <h3>Are you sure?</h3>
          <button className="ConfirmButton-btn" onClick={() => buyItem()}>
            Purchase
          </button>
          <button
            className="ConfirmButton-btn"
            onClick={() => setConfirmPurchase()}
          >
            Exit
          </button>
        </div>
      ) : (
        <div className="ConfirmButton-error">
          <h3>Not enough Gold!</h3>
        </div>
      )}
    </div>
  );
};
export default ConfirmButton;
