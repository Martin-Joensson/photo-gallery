// Admin.jsx
import { useState } from "react";
import { Upload } from "../components/Upload";

export const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
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
