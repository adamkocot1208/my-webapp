const { check } = require('express-validator');

exports.validateRegister = [
    // Walidacja pola 'username'
    check('username')
        .trim()
        .notEmpty().withMessage('Nazwa użytkownika nie może być pusta')
        .isLength({ min: 3 }).withMessage('Nazwa użytkownika musi być dłuższa niż 2 znaki')
        .isLength({ max: 30 }).withMessage('Nazwa użytkownika nie może być dłuższa niż 30 znaków'),
    
    // Walidacja pola 'password'
    check('password')
        .trim()
        .notEmpty().withMessage('Hasło nie może być puste')
        .isLength({ min: 8 }).withMessage('Hasło musi mieć co najmniej 8 znaków'),
    
    // Walidacja pola 'email'
    check('email')
        .trim()
        .notEmpty().withMessage('E-mail nie może być pusty')
        .isEmail().withMessage('Nieprawidłowy adres e-mail')
];