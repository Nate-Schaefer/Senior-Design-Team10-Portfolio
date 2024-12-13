// sendEmail.js (Backend on Glitch)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors()); // Enable CORS

// Set up transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // From .env
    pass: process.env.EMAIL_PASS,  // From .env
  }
});

// Function to send email
const sendEmail = (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // From .env
    to: to,
    subject: subject,
    text: message,
  };
  return transporter.sendMail(mailOptions);
};

// Endpoint to send email
app.post('/send-email', async (req, res) => {
  const { teamMemberEmail, userName, message, timestamp } = req.body;
  
  const subject = `New Comment from ${userName}`;
  const emailMessage = `
    You have received a new comment on your page:
    
    From: ${userName}
    Message: ${message}
    Timestamp: ${timestamp}
  `;
  console.log(teamMemberEmail, subject, emailMessage);
  
  try {
    await sendEmail(teamMemberEmail, subject, emailMessage);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start server on Glitch's provided port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
