// src/components/ProtectedContent.js
import React from "react";
import { Link } from "react-router-dom";
import "./ProtectedContent.css";

const ProtectedContent = () => {
  return (
    <div className="protected-content">
      <h1>Team Members</h1>
      <ul>
        <li>
          <Link to="/team/caiden">Caiden</Link>
        </li>
        <li>
          <Link to="/team/rabi">Rabi</Link>
        </li>
        <li>
          <Link to="/team/nick">Nick</Link>
        </li>
        <li>
          <Link to="/team/nate">Nate</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProtectedContent;
