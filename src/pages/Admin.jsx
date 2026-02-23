// Admin.jsx
import { useState } from "react";
import { Upload } from "../components/Upload";

export const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  /** Handle login using serverless function */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/.netlify/functions/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // ✅ Store JWT in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("jwtToken", data.token);
        }

        setAuthenticated(true);
        setPassword("");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Check console.");
    }
  };

  /** Logout function */
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwtToken");
    }
    setAuthenticated(false);
  };

  if (!authenticated) {
    return (
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 max-w-xs m-auto mt-20"
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    );
  }

  return (
    <div className="p-4 max-w-2xl m-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <Upload />
    </div>
  );
};
