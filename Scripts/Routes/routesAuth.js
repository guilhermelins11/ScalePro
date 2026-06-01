const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

// Registro de usuário
router.post('/register', controller.registerUser);

module.exports = router;
