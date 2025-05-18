const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerServ');

router.get('/', controller.getServicos);

module.exports = router;