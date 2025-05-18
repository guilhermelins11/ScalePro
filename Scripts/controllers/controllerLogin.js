const db = require('../config/dbCadMei');

exports.loginUsuario = (req, res) => {
    const { CNPJ, senha } = req.body;

    const sql = 'SELECT * FROM cadastro WHERE CNPJ = ? AND senha = ?';

    db.query(sql, [CNPJ, senha], (err, results) => {
        if (err) {
            console.error('Erro ao fazer login:', err)
            return res.status(500).send('Erro ao fazer login.');
        }
        if (results.length > 0) {
            res.redirect('/geral.html');
        } else {
            res.send('CNPJ ou senha inválidos');
        }
    });
};