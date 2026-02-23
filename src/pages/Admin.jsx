import { useState } from "react";
import { Upload } from "../components/Upload";

export const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/.netlify/functions/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.error || "Login failed");
      }

      // Store JWT
      localStorage.setItem("admin_token", data.token);
      setAuthenticated(true);
    } catch (err) {
      console.error(err);
      alert("Login failed. Check console.");
    }
  };

  if (!authenticated) {
    return (
      <form onSubmit={handleLogin}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
        />
        <button type="submit">Login</button>
      </form>
    );
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <Upload />
    </div>
  );
};
