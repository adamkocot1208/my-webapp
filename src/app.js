const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const mapRoutes = require('./routes/mapRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', authRoutes);
app.use('/api/maps', mapRoutes);

// Catch-all route for handling the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

app.get('/forgotPassword', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/forgotPassword.html'));
});


module.exports = app;
