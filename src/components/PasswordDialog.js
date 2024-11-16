import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordDialog.css";

const PasswordDialog = ({ onAuthenticate }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAuthenticate(password)) {
      navigate("/protected");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="password-dialog">
      <h1>Enter Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PasswordDialog;
