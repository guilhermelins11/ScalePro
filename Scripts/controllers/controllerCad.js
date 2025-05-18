const db = require('../config/dbCadMei');

exports.cadastrarUsuario = (req, res) => {
    const { nome_Fantasia, cnpj, telefone, senha } = req.body;

    const sql = 'INSERT INTO cadastro (nome_Fantasia, CNPJ, telefone, senha) VALUES (?, ?, ?, ?)';

    db.query(sql, [nome_Fantasia, cnpj, telefone, senha], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            return res.status(500).send('Erro ao cadastrar usuário.');
        }
        res.redirect('/entrar.html');
    });
};