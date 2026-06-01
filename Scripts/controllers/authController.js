const db = require('../config/dbCadMei');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_long_secret';

exports.registerUser = (req, res) => {
    const { username, senha, role, cadastro_id } = req.body;
    if (!username || !senha) return res.status(400).send('username e senha são obrigatórios');

    const passwordHash = bcrypt.hashSync(senha, 10);

    const sql = 'INSERT INTO usuarios (username, password_hash, role, cadastro_id) VALUES ($1, $2, $3, $4) RETURNING id';
    db.query(sql, [username, passwordHash, role || 'user', cadastro_id || null], (err, result) => {
        if (err) {
            console.error('Erro ao registrar usuário:', err);
            return res.status(500).send('Erro ao registrar usuário.');
        }
        const userId = result.rows[0].id;
        // emitir JWT e setar cookie
        const token = jwt.sign({ id: userId, username, role: role || 'user' }, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/geral.html');
    });
};

exports.loginUser = (req, res) => {
    const { username, senha } = req.body;
    if (!username || !senha) return res.status(400).send('username e senha são obrigatórios');

    const sql = 'SELECT id, password_hash, role FROM usuarios WHERE username = $1';
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).send('Erro ao fazer login.');
        }
        const rows = result && result.rows ? result.rows : [];
        if (rows.length === 0) return res.status(401).send('Usuário não encontrado');

        const user = rows[0];
        const match = bcrypt.compareSync(senha, user.password_hash);
        if (!match) return res.status(401).send('Credenciais inválidas');

        // Autenticação bem-sucedida: emitir JWT e redirecionar.
        const token = jwt.sign({ id: user.id, username, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/geral.html');
    });
};
