// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Our Team Portfolio</h1>
      <p>
        <Link to="/protected" className="protected-link">
          Protected Content
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
