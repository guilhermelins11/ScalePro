const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerCad');

router.post('/', controller.cadastrarUsuario);

    module.exports = router;