const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.username;
    } catch (error) {
        throw new Error('Nieprawidłowy lub nieaktualny token');
    }
};

module.exports = verifyToken;
