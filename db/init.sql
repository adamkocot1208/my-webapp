-- Aktywacja rozszerzenia PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tworzenie tabeli użytkowników
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMP
);

-- Indeks na polu email
CREATE INDEX idx_users_email ON users(email);

-- Indeks na polu reset_password_token
CREATE INDEX idx_users_reset_token ON users(reset_password_token);
