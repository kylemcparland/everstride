"use client";
import "./Login.css";
import { useState } from "react";

const Login = () => {
  // Usestate for the form...
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    window.location.reload();
    setLoading(false);
  };

  return (
    <div className="Login">
      <select value={username} onChange={(e) => setUsername(e.target.value)}>
        <option value="">Select a user</option>
        <option value="Kyle McParland">Kyle McParland</option>
        <option value="Jon Hiebert">Jon Hiebert</option>
        <option value="Ben Hallam">Ben Hallam</option>
      </select>

      <button onClick={handleLogin} disabled={!username}>
        Login
      </button>
      <div className="Loading"><h1>Loading...</h1></div>
    </div>
  );
};
// This is the login menu in the nav bar. (moved out of nav to screen center now)
export default Login;
