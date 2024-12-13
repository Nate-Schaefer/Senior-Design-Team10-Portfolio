// src/components/TeamMember.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, push, onValue } from "firebase/database";
import { database } from "../firebase/config";
import "./TeamMember.css";

const teamData = {
  caiden: {
    name: "Caiden",
    bio: "Electrical engineering student at the University of Iowa with a 3.95 GPA and a passion for applying engineering to solve medical challenges. My academic journey has been marked by hands-on research in medical physics, including the dosimetric benefits of MR-guided adaptive radiotherapy and other similar publications. During my studies at the university of Iowa I have found a passion for electronics and circuit design. My future goals include pursuing a PhD in medical physics to advance cancer treatment technologies. Outside of academics, I enjoy riding motorcycles, 3D printing, and staying active by working out or 3D printing.",
    image: "/Headshot.jpeg",
    email: "caiden-atienza@uiowa.edu",
    projects: [
      {
        image: "/Bartender.jpeg",
        title: "Bartender",
        description: "An automated bartender system created as the final project for an embedded systems course. The setup dispenses custom drink mixtures, controlled via a user-friendly interface and powered by an ATmega328p microcontroller. ",
      },
      {
        image: "/IRR.PNG",
        title: "Transmitter and Receiver",
        description: "An infrared transmitter and receiver system demonstrating wireless data transmission. This project highlights the design and implementation of circuits to transmit and detect signals using IR technology. ",
      },
      {
        image: "/Thermometer.jpeg",
        title: "Thermometer",
        description: "A senior design lab project featuring a Wi-Fi-enabled thermometer for real-time temperature monitoring. The device integrates sensors with a microcontroller to transmit data to a cloudbased dashboard for visualization and analysis. ",
      },
    ],
  },
  rabi: {
    name: "Rabi",
    bio: "Rabi excels in Y.",
    image: "/path-to-rabi.jpg",
    email: "rabi-alaya@uiowa.edu",
    projects: [
      {
        image: "/project1-rabi.jpg",
        title: "Amazing App",
        description: "Project 1: An AI tool that predicts trends.",
      },
      {
        image: "/project2-rabi.jpg",
        title: "Amazing App",
        description: "Project 2: An e-commerce platform with unique features.",
      },
      {
        image: "/project3-rabi.jpg",
        title: "Amazing App",
        description: "Project 3: A personal blog for tech enthusiasts.",
      },
    ],
  },
  nick: {
    name: "Nick",
    bio: "Experienced in the fields of Software Engineering, Applied AI/ML, and Human-Computer Interaction. I grew up in a small Iowa farm town (home to the Field of Dreams) and currently live in Iowa City. Outside of programming, I enjoy lifting weights, cooking, and watching UFC events.",
    image: "/nickHeadshot.jpg",
    email: "nickhageman0@gmail.com",
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
    email: "nathanschaefer-schaefer@uiowa.edu",
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
  
      // Send an email to the team member
      const teamMemberEmail = member.email; // Get the team member's email
      const { userName, message, timestamp } = newComment;
      // Call backend API to send email
      fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamMemberEmail,
          userName,
          message,
          timestamp,
        }),
      })
        .then(response => response.json())
        .then(data => console.log('Email sent:', data))
        .catch(error => console.error('Error sending email:', error));
        console.log("Data sent to backend:", {
          teamMemberEmail,
          userName,
          message,
          timestamp,
        });
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
