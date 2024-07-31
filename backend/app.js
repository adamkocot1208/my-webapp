const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(express.static('frontend/public'));

app.use('/api/auth', authRoutes);

module.exports = app;