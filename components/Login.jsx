"use client";
import "./Login.css";
import { useState } from "react";

const Login = () => {
  // Usestate for the form...
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    window.location.reload();
  };

  return (
    <div className="Login">
      <h2>Login:</h2>
      <select value={username} onChange={(e) => setUsername(e.target.value)}>
        <option value="">Select a username</option>
        <option value="Kyle McParland">Kyle McParland</option>
        <option value="Jon Hiebert">Jon Hiebert</option>
        <option value="Ben Hallam">Ben Hallam</option>
      </select>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
// This is the login menu in the nav bar.
export default Login;
