const pool = require('../utils/db');

const createUser = async (username, email, passwordHash) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [username, email, passwordHash]
    );
    return result.rows[0];
};

// Additional user-related database operations...

module.exports = { createUser };
