const pool = require('../utils/db');

const getUserLocations = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is set in the request object after authentication
    const result = await pool.query('SELECT * FROM user_locations WHERE user_id = $1', [userId]);
    res.json(result.rows);
};

// Additional map-related methods...

module.exports = { getUserLocations };
