const db = require('../config/dbCadMei');

exports.listarCadastros = (callback) => {
    db.query('SELECT * FROM cadastro', (err, result) => {
        if (err) return callback(err);
        const rows = result && result.rows ? result.rows : [];
        callback(null, rows);
    });
};