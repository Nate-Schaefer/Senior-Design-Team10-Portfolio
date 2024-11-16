// src/components/TeamMember.js
import React from "react";
import { useParams } from "react-router-dom";

const teamData = {
  caiden: {
    name: "Caiden",
    bio: "Caiden is passionate about X.",
    image: "/path-to-caiden.jpg",
  },
  rabi: {
    name: "Rabi",
    bio: "Rabi excels in Y.",
    image: "/path-to-rabi.jpg",
  },
  nick: {
    name: "Nick",
    bio: "Nick specializes in Z.",
    image: "/path-to-nick.jpg",
  },
  nate: {
    name: "Nate",
    bio: "Nate enjoys A.",
    image: "/path-to-nate.jpg",
  },
};

const TeamMember = () => {
  const { name } = useParams();
  const member = teamData[name];

  if (!member) {
    return <p>Team member not found.</p>;
  }

  return (
    <div className="team-member">
      <h1>{member.name}</h1>
      <p>{member.bio}</p>
      <img src={member.image} alt={member.name} />
    </div>
  );
};

export default TeamMember;
