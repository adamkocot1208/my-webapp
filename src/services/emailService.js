const nodemailer = require('nodemailer');
require('dotenv').config();
const generateToken = require('../utils/generateToken');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the email service you prefer
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or application-specific password
    }
});

// Function to send a verification email
const sendVerificationEmail = async (email, username) => {
   
    const token = generateToken(username);
    // Construct the confirmation link
    const confLink = `${process.env.BASE_URL}/confirm?token=${token}`;

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Potwierdzenie rejestracji',
        html: `
            <h1>Witaj ${username},</h1>
            <p>Dziękujemy za dołączenie do Harnasiowego Geoportalu.</p>
            <p>Naciśnij poniższy link aby potwierdzić rejestrację:</p>
            <a href="${confLink}">Potwierdź rejestrację</a>
            <p>Jeżeli to nie Ty dokonałeś rejestracji, proszę zignorują tą wiadomość.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Potwierdzenie rejestracji zostało wysłane na adres ${email}`);
    } catch (error) {
        console.error(`Nie udało się wysłać weryfikacyjnej wiadomości e-mail do ${email}:`, error);
        throw new Error('Nie udało się wysłać weryfikacyjnej wiadomości e-mail');
    }
};

module.exports = sendVerificationEmail;