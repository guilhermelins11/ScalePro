const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerLogin');

router.post('/', controller.loginUsuario);

module.exports = router;