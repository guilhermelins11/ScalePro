const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API de usuários funcionando!');
});

    module.exports = router;