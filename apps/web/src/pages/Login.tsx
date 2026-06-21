import React, { useState } from "react";
import { login } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    const response = await fetch("https://rapyard.club/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});
    if (result.success) {
      setMessage("Login successful!");
      window.location.href = "/yardgate";
    } else {
      setMessage("Invalid credentials.");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      color: "#fff"
    }}>
      <h1>RAPYARD LOGIN</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "10px", padding: "12px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "10px", padding: "12px" }}
      />
      <button
        onClick={handleLogin}
        style={{
          padding: "12px 30px",
          background: "transparent",
          border: "1px solid #777",
          color: "#fff",
          letterSpacing: "3px",
          textTransform: "uppercase",
          cursor: "pointer"
        }}
      >
        Login
      </button>
      <p>{message}</p>
    </div>
  );
}
