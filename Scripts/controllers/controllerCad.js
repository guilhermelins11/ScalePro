const db = require('../config/dbCadMei');

exports.cadastrarUsuario = (req, res) => {
    // Nota: não armazenamos senhas em `cadastro` — a autenticação foi separada
    // na tabela `usuarios`. Este endpoint cria apenas os dados da empresa.
    const { razao_social, cnpj, telefone } = req.body;

    const sql = 'INSERT INTO cadastro (razao_social, cnpj, telefone) VALUES ($1, $2, $3)';

    db.query(sql, [razao_social, cnpj, telefone], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            return res.status(500).send('Erro ao cadastrar usuário.');
        }
        res.redirect('/entrar.html');
    });
};