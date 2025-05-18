const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerItem');

router.get('/', controller.getItens);

module.exports = router;