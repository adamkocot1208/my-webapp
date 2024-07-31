const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Function to execute a query
const query = (text, params) => {
    return pool.query(text, params);
};

// Export the query function
module.exports = {
    query
};
