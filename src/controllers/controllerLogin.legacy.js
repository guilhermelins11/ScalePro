// LEGACY controller: mantido apenas para histórico.
// Uso atual: a autenticação foi migrada para `authController.js` e a tabela `usuarios`.
// Este arquivo era responsável por autenticar contra `cadastro.senha` (texto plano).
// NÃO use este arquivo em produção. Para reativar, valide e migre senhas para `usuarios`.

const db = require('../../Scripts/config/dbCadMei');

exports.loginUsuario = (req, res) => {
    const { razao_social, senha } = req.body;

    const sql = 'SELECT * FROM cadastro WHERE razao_social = $1 AND senha = $2';

    db.query(sql, [razao_social, senha], (err, result) => {
        if (err) {
            console.error('Erro ao fazer login (legacy):', err)
            return res.status(500).send('Erro ao fazer login.');
        }
        const rows = result && result.rows ? result.rows : [];
        if (rows.length > 0) {
            res.redirect('/geral.html');
        } else {
            res.send('Razão social ou senha inválidos');
        }
    });
};
