const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Upewnij się, że masz folder publiczny z plikami frontendowymi

// Routes
app.use('/api/auth', authRoutes);

// Serwowanie stron HTML
app.get('/', (req, res) => {
  res.sendFile('C:/Users/a.kocot/my-webapp/frontend/public/index.html');
});

app.get('/login.html', (req, res) => {
  res.sendFile('C:/Users/a.kocot/my-webapp/frontend/public/login.html');
});

app.get('/register.html', (req, res) => {
  res.sendFile('C:/Users/a.kocot/my-webapp/frontend/public/register.html');
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
