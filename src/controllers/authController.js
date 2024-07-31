const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailService = require('../services/emailService');
const db = require('../utils/db')
const { validationResult } = require('express-validator');
const verifyToken = require('../utils/verifyToken');


// Register new user
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if email or username already exists
        const userCheck = await db.query('SELECT id FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (userCheck.rows.length > 0) {
            // If user with same email or username exists, return appropriate error
            if (userCheck.rows.some(user => user.email === email)) {
                return res.status(400).json({ error: 'Adres e-mail już istnieje' });
            }
            if (userCheck.rows.some(user => user.username === username)) {
                return res.status(400).json({ error: 'Nazwa użytkownika już istnieje' });
            }
        }

        // Insert new user
        const result = await db.query(
            'INSERT INTO users(email, username, password_hash) VALUES($1, $2, $3)',
            [email, username, hashedPassword]
        );

        // Send verification email
        await emailService(email, username);

        res.status(201).json({ message: 'Rejestracja powiodła się. Sprawdź pocztę e-mail, aby zweryfikować swoje konto.' });
    } catch (err) {
        // Handle unique violation error
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Adres e-mail lub nazwa użytkownika są już używane' });
        }
        console.error(err);
        res.status(500).json({ error: 'Rejestracja użytkownika nie powiodła się' });
    }
};

//Confirm new user account
exports.confirmAccount = async (req, res) => {
    const { token } = req.query;

    try {
        // Zweryfikuj token i uzyskaj username
        const username = verifyToken(token);
        console.log(username)

        // Zaktualizuj status użytkownika w bazie danych
        const result = await db.query('UPDATE users SET confirmed = TRUE WHERE username = $1 RETURNING username', [username]);

        if (result.rowCount === 0) {
            return res.status(400).send('Niepoprawny token lub użytkownik nie istnieje');
        }

        // Możesz przekierować użytkownika do strony logowania lub wyświetlić odpowiedni komunikat
        res.status(200).send('Konto zostało pomyślnie potwierdzone!');
    } catch (error) {
        console.error(error);
        res.status(400).send('Niepoprawny lub wygasły token');
    }
};

// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (user && await bcrypt.compare(password, user.password_hash)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Podano błędny login lub hasło' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd logowania' });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email, password } = req.body;
    // SQL to authenticate user and return JWT
    // ...
};

exports.resetPassword = async (req, res) => {
    const { email, password } = req.body;
    // SQL to authenticate user and return JWT
    // ...
};

// Other methods 