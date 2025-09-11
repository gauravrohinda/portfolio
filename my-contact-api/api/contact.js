const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// This is the Vercel serverless function endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Use environment variables for security
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like SendGrid or Outlook
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'gauravrohinda0@gmail.com', // Your receiving email is safe here
        subject: `New contact from your portfolio by ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

module.exports = app;