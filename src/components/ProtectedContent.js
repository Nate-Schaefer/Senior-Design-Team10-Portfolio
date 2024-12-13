// src/components/ProtectedContent.js
import React from "react";
import { Link } from "react-router-dom";

const ProtectedContent = () => {
  const listStyle = {
    border: "2px solid yellow",
    backgroundColor: "black",
    padding: "10px",
    listStyleType: "none",
  };

  const listItemStyle = {
    color: "gold",
    textDecoration: "none", // Ensures no underline or color change for links
    fontSize: "1.5rem", // Makes the font larger
    marginBottom: "20px", // Adds vertical space between list items
    display: "block", // Ensures each list item is block-level
    textShadow: "0 0 5px yellow, 0 0 10px yellow",
    animation: "glow 1.5s infinite",
  };

  const separatorStyle = {
    borderTop: "1px solid yellow",
    margin: "10px 0", // Adds spacing around the separator
  };

  const keyframesStyle = `
    @keyframes glow {
      0% { text-shadow: 0 0 5px yellow, 0 0 10px yellow; }
      50% { text-shadow: 0 0 15px yellow, 0 0 30px yellow; }
      100% { text-shadow: 0 0 5px yellow, 0 0 10px yellow; }
    }
  `;

  return (
    <div className="protected-content">
      <h1>Team Members</h1>
      <style>{keyframesStyle}</style>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <Link to="/team/caiden" style={{ color: "gold" }}>Caiden</Link>
        </li>
        <div style={separatorStyle}></div>
        <li style={listItemStyle}>
          <Link to="/team/rabi" style={{ color: "gold" }}>Rabi</Link>
        </li>
        <div style={separatorStyle}></div>
        <li style={listItemStyle}>
          <Link to="/team/nick" style={{ color: "gold" }}>Nick</Link>
        </li>
        <div style={separatorStyle}></div>
        <li style={listItemStyle}>
          <Link to="/team/nate" style={{ color: "gold" }}>Nate</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProtectedContent;
