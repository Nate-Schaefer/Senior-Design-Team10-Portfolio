// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Create a CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Our Team Portfolio</h1>
      <h2>Meet the Team</h2>
      <div className="team-links">
        <Link to="/caiden" className="team-link">Caiden</Link>
        <Link to="/rabi" className="team-link">Rabi</Link>
        <Link to="/nick" className="team-link">Nick</Link>
        <Link to="/nate" className="team-link">Nate</Link>
      </div>
    </div>
  );
};

export default HomePage;
