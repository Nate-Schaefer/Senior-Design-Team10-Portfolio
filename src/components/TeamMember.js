// src/components/TeamMember.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, push, onValue } from "firebase/database";
import { database } from "../firebase/config";
import "./TeamMember.css";

const teamData = {
  caiden: {
    name: "Caiden",
    bio: "Caiden is passionate about X.",
    image: "/path-to-caiden.jpg",
    projects: [
      {
        image: "/project1-caiden.jpg",
        title: "Amazing App",
        description: "Project 1: A groundbreaking app that does amazing things.",
      },
      {
        image: "/project2-caiden.jpg",
        title: "Amazing App",
        description: "Project 2: A website redesign for an innovative brand.",
      },
      {
        image: "/project3-caiden.jpg",
        title: "Amazing App",
        description: "Project 3: A portfolio showcasing Caiden's expertise.",
      },
    ],
  },
  rabi: {
    name: "Rabi",
    bio: "Experienced in software development and data analysis. Currently developing a C# GUI application to support data annotation for a 170-participant research study. As an Iowa City native, I take pride in my local roots. During my free time, I enjoy playing soccer, hoping on fortnite, and experimenting in the kitchen.",
    image: "/rabiHeadshot.jpg",
    projects: [
      {
        image: "/rabiProject1.png",
        title: "Bike GUI",
        description: "A C# GUI application to support data annotation for a 170-participant research study.",
      },
      {
        image: "/rabiProject2.png",
        title: "Covid-19 Co-Author Network Analysis",
        description: "Created a co-author network to identify key researchers and collaboration patterns in the COVID-19 research community.", 
      },
      {
        image: "/rabiProject3.png",
        title: "STAT:2020 Visualization Tool", 
        description: "A statistics visualization tool designed to help students taking an introductory statistics course visualize different distributions.",
      },
    ],
  },
  nick: {
    name: "Nick",
    bio: "Experienced in the fields of Software Engineering, Applied AI/ML, and Human-Computer Interaction. I grew up in a small Iowa farm town (home to the Field of Dreams) and currently live in Iowa City. Outside of programming, I enjoy lifting weights, cooking, and watching UFC events.",
    image: "/nickHeadshot.jpg",
    projects: [
      {
        image: "/nickProject1.png",
        title: "FarmVision",
        description: "Modeled agricultural field data in Virtual Reality by utilizing John Deere Precision Ag APIs. Awarded 'Best Data Collection Hack' at HackUIowa 2023.",
      },
      {
        image: "/nickProject2.PNG",
        title: "Handheld Retro Game Controller",
        description: "Designed and constructed a handheld gaming device leveraging the capabilities of the ESP8266 module and a Raspberry Pi. The choice of game for our device was Pac-Man, a classic arcade game known for its straightforward yet challenging gameplay.",
      },
      {
        image: "/nickProject3.PNG",
        title: "LeetGPT",
        description: "Developed a Chrome extension tool that provides LeetCode users with solutions to coding problems. Leveraged OpenAI's ChatGPT Language Model API for generative solutions.",
      },
    ],
  },
  nate: {
    name: "Nate",
    bio: "Nate enjoys A.",
    image: "/path-to-nate.jpg",
    projects: [
      {
        image: "/project1-nate.jpg",
        title: "Amazing App",
        description: "Project 1: A mobile app for fitness tracking.",
      },
      {
        image: "/project2-nate.jpg",
        title: "Amazing App",
        description: "Project 2: A machine learning model for predictions.",
      },
      {
        image: "/project3-nate.jpg",
        title: "Amazing App",
        description: "Project 3: A video production portfolio.",
      },
    ],
  },
};

const TeamMember = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const member = teamData[name];
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({ userName: "", message: "" });

  useEffect(() => {
    if (!member) return;

    // Fetch comments for the team member
    const commentsRef = ref(database, `team/${name}/comments`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const commentsArray = Object.values(data);
        setComments(commentsArray);
      } else {
        setComments([]);
      }
    });

    return () => unsubscribe();
  }, [name]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.message) return;

    const commentsRef = ref(database, `team/${name}/comments`);
    const newComment = {
      name: formData.userName,
      message: formData.message,
      timestamp: new Date().toISOString(),
    };

    push(commentsRef, newComment).then(() => {
      setFormData({ userName: "", message: "" });
    });
  };

  if (!member) {
    return <p>Team member not found.</p>;
  }

  return (
    <div className="team-member">
      {/* Back to Protected Button */}
      <button className="back-button" onClick={() => navigate("/protected")}>
        Back to Menu
      </button>

      {/* Profile Section */}
      <div className="profile-section">
        <img src={member.image} alt={member.name} className="profile-pic" />
        <h1>{member.name}</h1>
        <p>{member.bio}</p>
      </div>

      {/* Projects Section */}
      <div className="projects-section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {member.projects.map((project, index) => (
            <div key={index} className="project-card">
              <img
                src={project.image}
                alt={`Project ${index + 1}`}
                className="project-image"
              />
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Leave a Comment</h2>
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={formData.userName}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      {/* Comments Section */}
      <div className="comments-section">
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.name}</strong> at{" "}
                {new Date(comment.timestamp).toLocaleString()}
              </p>
              <p>{comment.message}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
