const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailService = require('../services/emailService');

// Register new user
exports.register = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users(email, username, password_hash) VALUES($1, $2, $3) RETURNING id',
            [email, username, hashedPassword]
        );
        // Send confirmation email here (do napisania)
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Rejestracja użytkownika nie powiodła się' });
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