const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/', controller.loginUser);

router.get('/logout', (req, res) => {
    // limpar cookie JWT
    res.clearCookie('token');
    if (req.session) {
        req.session.destroy(err => {
            if (err) console.error('Erro ao destruir sessão:', err);
            res.redirect('/entrar.html');
        });
    } else {
        res.redirect('/entrar.html');
    }
});

module.exports = router;
