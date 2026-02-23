import { useState } from "react";
import { Login } from "./Login";
import { Upload } from "../components/Upload";

export const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <h2 className="my-4 text-2xl font-headerFont">Admin</h2>
      {loggedIn ? (
        <Upload />
      ) : (
        <div>
          <p>Not Logged In</p>{" "}
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
      )}

    </div>
  );
};
