"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  // Usestate for the form...
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    router.push("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
