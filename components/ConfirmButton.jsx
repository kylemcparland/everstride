const ConfirmButton = ({ setConfirmPurchase, userId, itemId }) => {
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
        console.log("Item successfully purchased:", data.data);
        window.location.reload();
      } else {
        setError(data.error || "Failed to purchase item");
        console.error(data.error);
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error("Error:", err);
    }
  };

  return (
    <div>
      Are you sure?
      <button onClick={() => buyItem()}>Purchase</button>
      <button onClick={() => setConfirmPurchase()}>Exit</button>
    </div>
  );
};
export default ConfirmButton;
