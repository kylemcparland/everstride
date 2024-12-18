"use client";
import "./Logout.css";

const Logout = () => {
  const handleLogout = async () => {
    await fetch("api/logout", {
      method: "POST",
    });

    window.location.reload();
  };

  return (
    <div className="Logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
