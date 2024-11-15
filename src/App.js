// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import TeamMember from "./components/TeamMember";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/caiden"
          element={<TeamMember name="Caiden" bio="Caiden is passionate about X." image="/path-to-caiden.jpg" />}
        />
        <Route
          path="/rabi"
          element={<TeamMember name="Rabi" bio="Rabi excels in Y." image="/path-to-rabi.jpg" />}
        />
        <Route
          path="/nick"
          element={<TeamMember name="Nick" bio="Nick specializes in Z." image="/path-to-nick.jpg" />}
        />
        <Route
          path="/nate"
          element={<TeamMember name="Nate" bio="Nate enjoys A." image="/path-to-nate.jpg" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
