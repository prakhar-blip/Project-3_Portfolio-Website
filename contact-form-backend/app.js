const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
    const { fullname, email, message } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'carryzee736@gmail', // Your Gmail email
            pass: 'Anish@123' // Your Gmail password or App Password
        }
    });

    // Email content
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'carryzee736@gmail.com', // Your email address
        subject: 'New Contact Form Submission',
        html: `
            <h3>Contact Details:</h3>
            <p>Full Name: ${fullname}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Something went wrong');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
