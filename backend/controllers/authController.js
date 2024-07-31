const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Rejestracja użytkownika
exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, username]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Rejestracja nie powiodła się' });
  }
};

// Logowanie użytkownika
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ error: 'Nieprawidłowy email lub hasło' });

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).json({ error: 'Nieprawidłowy email lub hasło' });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Logowanie nie powiodło się' });
  }
};

// Resetowanie hasła
exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ error: 'Nie znaleziono użytkownika z tym adresem e-mail' });

    const resetToken = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    await pool.query('UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3', [resetToken, new Date(Date.now() + 15 * 60 * 1000), email]);

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    await sendEmail(email, 'Reset hasła', `Kliknij tutaj, aby zresetować hasło: ${resetLink}`);
    res.json({ message: 'E-mail do resetu hasła został wysłany' });
  } catch (error) {
    res.status(500).json({ error: 'Reset hasła nie powiódł się' });
  }
};

