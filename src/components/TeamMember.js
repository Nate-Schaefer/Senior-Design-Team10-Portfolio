// src/components/TeamMember.js
import React from "react";
import { Link } from "react-router-dom";
import "./TeamMember.css"; // Create a CSS file for styling

const TeamMember = ({ name, bio, image }) => {
  return (
    <div className="team-member">
      <img src={image} alt={`${name}'s Profile`} className="profile-pic" />
      <h1>{name}'s Portfolio</h1>
      <p>{bio}</p>
      <div className="back-link">
        <Link to="/" className="back-button">Back to Homepage</Link>
      </div>
    </div>
  );
};

export default TeamMember;
