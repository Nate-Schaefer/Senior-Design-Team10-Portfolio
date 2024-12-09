import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../firebase/config";
import "./PasswordDialog.css";
 
const PasswordDialog = ({ onAuthenticate }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
 
    try {
      console.log("Attempting to fetch password");
      const passwordRef = ref(database, 'settings/password');
      console.log("Password reference created");
      const snapshot = await get(passwordRef);
      console.log("Password snapshot fetched:", snapshot.exists());
      
      if (!snapshot.exists()) {
        console.log("Password not found");
        setError("Error: Password configuration not found");
        return;
      }
 
      const correctPassword = snapshot.val();
      console.log("Password retrieved successfully");
      if (password === correctPassword) {
        const result = onAuthenticate(true);
        console.log("Authentication result:", result);
        if (result) {
          navigate("/protected");
        }
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Error checking password:", error);
      setError("An error occurred while checking the password. Please try again later.");
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