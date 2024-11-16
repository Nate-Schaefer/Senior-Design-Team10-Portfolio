// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProtectedContent from "./components/ProtectedContent";
import TeamMember from "./components/TeamMember";
import PasswordDialog from "./components/PasswordDialog";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = (password) => {
    if (password === "Fall2024Lab3") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/protected"
          element={
            isAuthenticated ? (
              <ProtectedContent />
            ) : (
              <Navigate to="/password" />
            )
          }
        />
        <Route
          path="/password"
          element={<PasswordDialog onAuthenticate={handleAuthentication} />}
        />
        <Route
          path="/team/:name"
          element={
            isAuthenticated ? (
              <TeamMember />
            ) : (
              <Navigate to="/password" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
