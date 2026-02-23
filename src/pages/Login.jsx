import { useState } from "react";

export const Login = ({ loggedIn, setLoggedIn }) => {
  const [password, setPassword] = useState("");

  async function onLogin(password) {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) throw new Error("Wrong password");

    const { token } = await res.json();
    localStorage.setItem("admin_token", token);
    setLoggedIn(true);
  }

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => onLogin(password)}>Login</button>
    </div>
  );
};
